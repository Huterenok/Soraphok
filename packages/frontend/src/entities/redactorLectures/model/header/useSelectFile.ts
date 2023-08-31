
import { Event } from "effector";
import { useUnit } from "effector-react";
import { ChangeEvent, useCallback, useRef } from "react";

export const useSelectFile = (changeSrc: Event<string>) => {
  const changeCoverUnit = useUnit(changeSrc);
  const filePicker = useRef<HTMLInputElement>(null);

  const onSelectFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const imgFile = event.target.files?.[0];
      if (!imgFile) return;
      changeCoverUnit(URL.createObjectURL(imgFile));
    },
    [changeCoverUnit]
  );

  const hadleClick = useCallback(() => {
    if (!filePicker || !filePicker?.current) return;
    filePicker.current.click();
  }, [filePicker]);

	return {
		filePicker,
		onSelectFile,
		hadleClick
	}
};
