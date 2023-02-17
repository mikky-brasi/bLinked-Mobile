import {useEffect, useState} from 'react';
import {LayoutRectangle, View, HostComponent} from 'react-native';

export function useRelativeLayout(
  ref: React.RefObject<View>,
  parent: React.RefObject<View>,
) {
  const [layout, setLayout] = useState<LayoutRectangle>();

  const measure = () => {
    ref.current?.measureLayout(
      parent.current as unknown as HostComponent<unknown>,
      (x, y, width, height) => {
        setLayout({x, y, width, height});
      },
      () => {},
    );
  };

  const onLayout = () => {
    measure();
  };

  useEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [layout, onLayout] as const;
}
