import React, { useEffect, useRef } from 'react';
import { Animated, View, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { useModal } from './ModalContext';

const { width, height } = Dimensions.get('window');

type IModalProps = {
    id: string;
    children: React.ReactNode;
    isVisible: boolean;
};

const CustomModal: React.FC<IModalProps> = ({ id, children, isVisible }) => {
    const { closeModal } = useModal();
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => closeModal(id));
        }
    }, [isVisible]);

    return isVisible ? (
        <Animated.View style={[styles.overlay, { opacity }]}>
            <TouchableWithoutFeedback onPress={() => closeModal(id)}>
                <View style={styles.modalContent}>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    ) : null;
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default CustomModal;
