export default {
    name: {
        type: 'string',
        title: 'Название'
    },
    price: {
        type: 'number',
        title: 'Цена'
    },
    count: {
        type: 'number',
        title: 'Количество'
    },
    p_type: {
        priority: 1,
        type: 'v-select',
        title: 'Изделие',
        options: {
            null: 'Выберите тип изделия...',
            tabletop: 'Столешница',
            sill: 'Подоконник',
            island: 'Остров',
            bar: 'Барная стойки',
            leg: 'Опорная нога',
            wall: 'Стеновая панель',
            ladder: 'Ступени'
        }
    },
    edge: {
        priority: 10,
        title: 'Кромка',
        type: 'option',
        content: ['edge_type', 'edge_thickness', 'edge_angle', 'edge_length']
    },
    edge_type: {
        title: 'Тип кромки',
        type: 'v-select',
        options: {
            null: 'Выберите тип кромки',
            '#1': 'Кромка №1',
            '#2': 'Кромка №2',
            '#3': 'Кромка №3',
            '#4': 'Кромка №4',
            '#6': 'Кромка №6',
            '#7': 'Кромка №7',
            'duck': 'Кромка "Утиный нос"',
            'complex': 'Фигурная кромка',
        }
    },
    edge_length: {
        title: 'Длина кромки',
        type: 'number',
        measurement: 'м.'
    },
    edge_thickness: {
        title: 'Толщина кромки',
        type: 'tab-select',
        options: {
            '20mm': '20 мм',
            '30mm': '30 мм',
            '40mm': '40 мм',
            other: 'Другая',

        }
    },
    edge_angle: {
        title: 'Угол склейки',
        type: 'tab-select',
        options: { 'a90': '90°', 'a45': '45°' }
    },
    border: {
        priority: 50,
        title: 'Бортик',
        type: 'option',
        content: ['border_type', 'border_length']
    },
    border_type: {
        title: 'Тип бортика',
        type: 'tab-select',
        options: {
            simple: 'Простой',
            calibrated: 'Калиброванный',
        }
    },
    border_length: {
        title: "Длина бортика",
        type: 'number',
        measurement: 'м.'
    },
    electric_socket: {
        title: "Вырез под розетку",
        type: 'number',
        measurement: 'шт'
    },
    sink: {
        priority: 20,
        title: 'Мойка',
        type: 'option',
        content: ['sink_type', 'sink_count']
    },
    sink_type: {
        title: 'Тип мойки',
        type: 'v-select',
        options: {
            null: 'Выберите тип мойки',
            over: 'Накладная',
            under: 'Поджимная',
            integrated: 'Интегрированная',
            integrated45: 'Интегрированная 45°',
            leveled: 'Вровень',
        }
    },
    sink_count: {
        title: 'Количество вырезов',
        type: 'number',
        measurement: 'шт.'
    },
    cookpanel: {
        priority: 30,
        title: 'Варочная панель',
        type: 'option',
        content: ['cookpanel_type', 'cookpanel_count']
    },
    cookpanel_type: {
        title: 'Тип монтажа',
        type: 'tab-select',
        options: {
            over: 'Накладная',
            leveled: 'Вровень',
        }
    },
    cookpanel_count: {
        title: 'Количество вырезов',
        type: 'number',
        measurement: 'шт.'
    },
    cutouts: {
        priority: 60,
        title: 'Вырезы',
        type: 'option',
        content: ['generic_cutouts', 'socket_cutouts', 'other_cutouts']
    },
    generic_cutouts: {
        title: 'Отверстия ⌀ =< 35мм',
        type: 'number',
        measurement: 'шт.'

    },
    socket_cutouts: {
        title: 'Отверстия под розетку 68мм',
        type: 'number',
        measurement: 'шт.'
    },
    other_cutouts: {
        title: 'Другие отверстия',
        type: 'number',
        measurement: 'шт.'
    },
    edge_options: {
        priority: 70,
        title: 'Опции кромки',
        type: 'option',
        content: ['edge_option_dripper', 'edge_option_tuck']
    },
    edge_option_dripper: {
        title: "Капельник",
        type: 'number',
        measurement: 'п.м.'
    },
    edge_option_tuck: {
        title: 'Подворот из камня',
        type: 'option',
        content: ['edge_option_tuck_length', 'edge_option_tuck_polish']
    },
    edge_option_tuck_length: {
        title: 'Длина подворота',
        type: 'number',
        measurement: 'п.м'
    },
    edge_option_tuck_polish: {
        title: 'Полировка подворота',
        type: 'option',
        content: ['edge_option_tuck_polish_size', 'edge_option_tuck_polish_area']
    },
    edge_option_tuck_polish_size: {
        title: 'Глубина шлифовки',
        type: 'tab-select',
        options: {
            'lt150': '< 150 мм',
            'gt150': '> 150 мм',
        }
    },
    edge_option_tuck_polish_area: {
        title: 'Область шлифовки',
        type: 'number',
        measurement: 'п.м/м2'
    },
    surface_options: {
        priority: 80,
        title: 'Поверхность',
        type: 'option',
        content: ['surface_option_runoff', 'surface_option_convection']
    },
    surface_option_runoff: {
        title: 'Лучи для стока воды',
        type: 'number',
        measurement: 'шт.'
    },
    surface_option_convection: {
        title: 'Конвекция',
        type: 'option',
        content: ['convection_type', 'convection_count']
    },
    convection_type: {
        title: 'Тип конвекции',
        type: 'tab-select',
        options: {
            leveled: 'Вровень',
            complex: 'Фрезеровка'
        }
    },
    convection_count: {
        title: "Число вырезов",
        type: 'number',
        measurement: 'шт.'
    },
    extra: {
        priority: 100,
        title: 'Дополнительно',
        type: 'option',
        content: ['extra_radius_angle', 'extra_pilaster', 'extra_chrome_foot', 'extra_45_foot']
    },
    extra_radius_angle: {
        title: 'Радиусный угол > 12 мм',
        type: 'number',
        measurement: 'шт.'
    },
    extra_pilaster: {
        title: 'Обход пиластры',
        type: 'number',
        measurement: 'шт.'
    },
    extra_chrome_foot: {
        title: 'Монтаж хром опоры',
        type: 'number',
        measurement: 'шт.'
    },
    extra_45_foot: {
        title: 'Стыковка опорной ноги из камня под 45°',
        type: 'number',
        measurement: 'шт.'
    },
    assembly: {
        title: 'Сборка',
        priority: '2',
        type: 'option',
        content: ['assembly_mounting_length', 'assembly_surface_stack',],
    },
    assembly_mounting_length: {
        title: 'Погонаж для монтажа',
        type: 'number',
        measurement: 'п.м.'
    },
    assembly_surface_stack: {
        title: 'Стыковка плоскости',
        type: 'option',
        content: ['assembly_surface_stack_type', 'assembly_surface_stack_count']
    },
    assembly_surface_stack_type: {
        title: 'Тип стыковки',
        type: 'tab-select',
        options: {
            straight: 'Прямая',
            curved: 'Косая',
        },
    },
    assembly_surface_stack_count: {
        title: 'Число стыковок',
        type: 'number',
        measurement: 'шт.'
    },

}