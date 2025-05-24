import React from 'react';
import styles from './Selector.module.css'
import Pencil from '../Pencils/Pencil'
import Brush from '../Pencils/Brush';

const allColors = [
    '#444444',
    '#76bb40',
    '#4d22b2',
    '#ffab01',
    '#f23459',
    '#d8c9fe',
    '#3a87fd',
    '#fe6250',
]

const colors = [
    '#444444',
    '#76bb40',
    '#4d22b2',
    '#ffab01',
];

const colors2 = [
    '#f23459',
    '#d8c9fe',
    '#3a87fd',
    '#fe6250',
]

const thicknesses = [2, 5, 10, 15, 20];

const PEN_TYPES = {
    SOLID: 'solid',
    BRUSH: 'brush',
};

export default function Selector({ selectedColor, onChangeColor, selectedThickness, onChangeThickness, selectedPenType, onChangePenType, hideSelector }) {
    return (
        <div className={`${styles.container} ${hideSelector ? styles.hide : styles.show}`}>
            <div className={styles.pen_container}>
                <button
                    onClick={() => onChangePenType(PEN_TYPES.SOLID)}
                    className={`${styles.pen} ${selectedPenType === PEN_TYPES.SOLID ? styles.activePen : ''}`}
                >
                    <Pencil selectedColor={selectedColor} />
                </button>
                <button
                    onClick={() => onChangePenType(PEN_TYPES.BRUSH)}
                    className={`${styles.pen} ${selectedPenType === PEN_TYPES.BRUSH ? styles.activePen : ''}`}
                >
                    <Brush selectedColor={selectedColor} />
                </button>

            </div>
            <div className={styles.colors_container}>
                <div className={styles.colors_content}>
                    {colors.map(color => (
                        <div
                            className={styles.color}
                            key={color}
                            onClick={() => onChangeColor(color)}
                            style={{
                                backgroundColor: color,
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                border: selectedColor === color ? '3px solid #007aff' : '3px solid transparent',
                                cursor: 'pointer',
                            }}
                            title={`Color ${color}`}
                        />
                    ))}
                </div>

                <div className={styles.colors_content}>
                    {colors2.map(color => (
                        <div
                            className={styles.color}
                            key={color}
                            onClick={() => onChangeColor(color)}
                            style={{
                                backgroundColor: color,
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                border: selectedColor === color ? '3px solid #007aff' : '3px solid transparent',
                                cursor: 'pointer',
                            }}
                            title={`Color ${color}`}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.streak_container}>
                <div className={styles.streak_content}>
                    {thicknesses.map(thickness => (
                        <div className={styles.streak_item} onClick={() => onChangeThickness(thickness)} style={{ border: selectedThickness === thickness ? '2px solid #007aff' : '2px solid transparent', }}>
                            <div
                                className={styles.streak}
                                key={thickness}
                                style={{
                                    width: thickness * 2,
                                    height: thickness * 2,
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    // backgroundColor: selectedThickness === thickness ? '#333' : '#bbb',
                                    backgroundColor: selectedColor,

                                }}
                                title={`Grosor ${thickness}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
