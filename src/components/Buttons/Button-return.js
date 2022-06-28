import { StyleSheet } from 'react-native'
import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import Colors  from '../Colors/colors'

const ButtonReturn = (props) => {
  return (
    <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={Colors.PRIMARY_COLOR}
    />
  )
}

export default ButtonReturn

const styles = StyleSheet.create({})