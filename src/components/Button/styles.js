import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 60px;
    background: #e02041;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: #FFF;
    font-size: 18px
`;

