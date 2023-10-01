// Copyright 2019 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';
import classNames from 'classnames';
import { get, noop } from 'lodash';
import { Manager, Popper, Reference } from 'react-popper';
import type { LocalizerType } from '../../types/Util';
import { useRefMerger } from '../../hooks/useRefMerger';
import { handleOutsideClick } from '../../util/handleOutsideClick';
import * as KeyboardLayout from '../../services/keyboardLayout';
import { GifPicker } from './GifPicker';

export type Props = Readonly<{
  i18n: LocalizerType;
  doSend: () => unknown;
  className?: string;
  closeOnPick?: boolean;
  onClose?: () => unknown;
}>;

export const GifButton = React.memo(function GifButtonInner({
  className,
  i18n,
  onClose,
  doSend,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const popperRef = React.useRef<HTMLDivElement | null>(null);
  const refMerger = useRefMerger();

  const handleClickButton = React.useCallback(() => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [open, setOpen]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [setOpen, onClose]);

  React.useEffect(() => {
    if (!open) {
      return noop;
    }

    return handleOutsideClick(
      () => {
        handleClose();
        return true;
      },
      {
        containerElements: [popperRef, buttonRef],
        name: 'GifButton',
      }
    );
  }, [open, handleClose]);

  // Install keyboard shortcut to open gif picker
  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { ctrlKey, metaKey, shiftKey } = event;
      const commandKey = get(window, 'platform') === 'darwin' && metaKey;
      const controlKey = get(window, 'platform') !== 'darwin' && ctrlKey;
      const commandOrCtrl = commandKey || controlKey;
      const key = KeyboardLayout.lookup(event);

      // We don't want to open up if the conversation has any panels open
      const panels = document.querySelectorAll('.conversation .panel');
      if (panels && panels.length > 1) {
        return;
      }

      if (commandOrCtrl && shiftKey && (key === 'i' || key === 'I')) {
        event.stopPropagation();
        event.preventDefault();

        setOpen(!open);
      }
    };
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [open, setOpen]);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <button
            type="button"
            ref={refMerger(buttonRef, ref)}
            onClick={handleClickButton}
            className={classNames(className, {
              'module-gif-button__button': true,
              'module-gif-button__button--active': open,
            })}
            aria-label={i18n('icu:EmojiButton__label')}
          />
        )}
      </Reference>
      {open ? (
        <div ref={popperRef}>
          <Popper placement="top-start" strategy="fixed">
            {({ ref, style }) => (
              <GifPicker
                ref={ref}
                i18n={i18n}
                style={style}
                doSend={doSend}
                onClose={handleClose}
              />
            )}
          </Popper>
        </div>
      ) : null}
    </Manager>
  );
});
