import React from 'react';
import { View } from 'react-native';

export interface Props {
  height?: string | number;
}

function Spacer({ height }: Props) {
  const style = { height: height !== undefined ? height : 15 };
  return <View style={style} />;
}

export default Spacer;
