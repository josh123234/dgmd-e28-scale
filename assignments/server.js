var board = {
    'ships':
        [
            {
                'name': 'ship1',
                'orientation': 'vertical',
                'size': 4,
                'coords':[2,3]
            },
            {
                'name':'ship2',
                'orientation': 'horizontal',
                'size': 3,
                'coords':[3,3]
            },
            {
                'name':'ship3',
                'orientation': 'vertical',
                'size': 2,
                'coords':[6,5]
            }

        ]
}

function sendTheBoard () {
    return board;
}