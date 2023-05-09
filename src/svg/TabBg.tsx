import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '../utils/Colors';

type Props = SvgProps & {
  color?: string;
};

export const TabBg: React.FC<Props> = ({color = 'black', ...props}) => {
  return (
    <Svg width={130} height={50} viewBox="0 0 130 50">
      <Path
        d="M65 35C81.6012 35 95.5028 23.4419 99.0969 7.93382C100.094 3.62962 103.582 0 108 0H130V58H0V0H22C26.4183 0 29.9055 3.62962 30.9031 7.93382C34.4972 23.4419 48.3988 35 65 35Z"
        fill = {Colors.tabBarColor}
      />
    </Svg>
  );
};
