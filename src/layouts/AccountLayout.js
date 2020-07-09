import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import VerticalCenterFlowLayout from './VerticalCenterFlowLayout'

const AccountLayout = (props) => {
    return (
      <ScrollView style={[{flex: 1, backgroundColor: "#f5f6fa"}, props.style]}>
        <VerticalCenterFlowLayout>
          {props.children}
        </VerticalCenterFlowLayout>
      </ScrollView>
    );
}

export default AccountLayout
