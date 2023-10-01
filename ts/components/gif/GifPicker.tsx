// Copyright 2019 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';
import classNames from 'classnames';
import type { GridCellRenderer } from 'react-virtualized';
import { AutoSizer, Grid } from 'react-virtualized';
import { chunk, clamp, debounce } from 'lodash';
import FocusTrap from 'focus-trap-react';

import type { LocalizerType } from '../../types/Util';
import { isSingleGrapheme } from '../../util/grapheme';
import { search } from './lib';
import { Emoji } from '../emoji/Emoji';
import type { GiphyResponseData } from './types';

export type GifPickDataType = {
  skinTone?: number;
  shortName: string;
};

export type OwnProps = {
  readonly i18n: LocalizerType;
  readonly doSend?: () => unknown;
  readonly onClose?: () => unknown;
};

export type Props = OwnProps & Pick<React.HTMLProps<HTMLDivElement>, 'style'>;

function focusOnRender(el: HTMLElement | null) {
  if (el) {
    el.focus();
  }
}

const COL_COUNT = 2;

export const GifPicker = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    ({ i18n, style, onClose }: Props, ref) => {
      const [searchMode, setSearchMode] = React.useState(false);
      const [searchText, setSearchText] = React.useState('');
      const [scrollToRow, setScrollToRow] = React.useState(0);
      const [gifs, setGifs] = React.useState<GiphyResponseData>([]);

      const debounceSearchChange = React.useMemo(
        () =>
          debounce((query: string) => {
            setScrollToRow(0);
            setSearchText(query);
          }, 200),
        [setSearchText, setScrollToRow]
      );

      const handleSearchChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          debounceSearchChange(e.currentTarget.value);
        },
        [debounceSearchChange]
      );

      // Handle key presses, particularly Escape
      React.useEffect(() => {
        const handler = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            if (searchMode) {
              event.preventDefault();
              event.stopPropagation();
              setScrollToRow(0);
              setSearchText('');
              setSearchMode(false);
            } else if (onClose) {
              event.preventDefault();
              event.stopPropagation();
              onClose();
            }
          } else if (!searchMode && !event.ctrlKey && !event.metaKey) {
            if (
              [
                'ArrowUp',
                'ArrowDown',
                'ArrowLeft',
                'ArrowRight',
                'Enter',
                'Shift',
                'Tab',
                ' ', // Space
              ].includes(event.key)
            ) {
              // Do nothing, these can be used to navigate around the picker.
            } else if (isSingleGrapheme(event.key)) {
              // A single grapheme means the user is typing text. Switch to search mode.
              setSearchMode(true);
              // Continue propagation, typing the first letter for search.
            } else {
              // For anything else, assume it's a special key that isn't one of the ones
              // above (such as Delete or ContextMenu).
              onClose?.();
              event.preventDefault();
              event.stopPropagation();
            }
          }
        };

        document.addEventListener('keydown', handler);

        return () => {
          document.removeEventListener('keydown', handler);
        };
      }, [onClose, searchMode, setSearchMode]);

      const fetchGifs = React.useCallback(async () => {
        const _gifs = await search(searchText || 'a');

        setGifs(_gifs);
      }, [searchText]);

      React.useEffect(() => {
        void fetchGifs();
      }, [fetchGifs]);

      const gifGrid = chunk(gifs, COL_COUNT);

      const rowCount = gifGrid.length;

      const cellRenderer = React.useCallback<GridCellRenderer>(
        ({ key, style: cellStyle, rowIndex, columnIndex }) => {
          const gif = gifGrid[rowIndex][columnIndex];

          return gif ? (
            <div
              key={key}
              className="module-emoji-picker__body__emoji-cell"
              style={cellStyle}
            >
              <img
                src={gif.images.original.webp}
                alt=""
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ) : null;
        },
        [gifGrid]
      );

      const onSectionRendered = React.useMemo(
        () =>
          debounce(() => {
            // TODO
          }, 10),
        []
      );

      return (
        <FocusTrap
          focusTrapOptions={{
            allowOutsideClick: true,
          }}
        >
          <div className="module-emoji-picker" ref={ref} style={style}>
            <header className="module-emoji-picker__header">
              <div className="module-emoji-picker__header__search-field">
                <input
                  ref={focusOnRender}
                  className="module-emoji-picker__header__search-field__input"
                  placeholder={i18n('icu:EmojiPicker--search-placeholder')}
                  onChange={handleSearchChange}
                  dir="auto"
                />
              </div>
            </header>
            {rowCount > 0 ? (
              <div>
                <AutoSizer>
                  {({ width, height }) => (
                    <Grid
                      key={searchText}
                      className="module-emoji-picker__body"
                      width={width}
                      height={height}
                      columnCount={COL_COUNT}
                      columnWidth={38}
                      rowHeight={100}
                      rowCount={rowCount}
                      cellRenderer={cellRenderer}
                      // In some cases, `scrollToRow` can be too high for a short period
                      //   during state changes. This ensures that the value is never too
                      //   large.
                      scrollToRow={clamp(scrollToRow, 0, rowCount - 1)}
                      scrollToAlignment="start"
                      onSectionRendered={onSectionRendered}
                    />
                  )}
                </AutoSizer>
              </div>
            ) : (
              <div
                className={classNames(
                  'module-emoji-picker__body',
                  'module-emoji-picker__body--empty'
                )}
              >
                {i18n('icu:GifPicker--empty')}
                <Emoji
                  shortName="slightly_frowning_face"
                  size={16}
                  style={{ marginInlineStart: '4px' }}
                />
              </div>
            )}
          </div>
        </FocusTrap>
      );
    }
  )
);
