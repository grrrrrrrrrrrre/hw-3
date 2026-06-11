// 1.Calculate total fares;
// 2.Calculate average fare for 1,2,3 classes of travel;
// 3.Calculate total quantity of survived and not survived passengers;
// 4.Calculate total quantity of survived and not survived men, women and children(under 18 years old)

import fs from "node:fs";

const stats = {
    firstClass: {
        totalP: 0,
        fare: 0
    },
    secondClass: {
        totalP: 0,
        fare: 0
    },
    thirdClass: {
        totalP: 0,
        fare: 0
    },
    survived: {
        men: [0,0],
        women: [0,0],
        children: [0,0]
    }

}

fs.readFile('./train.csv', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        data = data
            .split('\r\n')
            .filter(Boolean)
            .map(item => item.split(/,(?!\s)/));
        for (let i = 1; i < data.length; i++) {
            switch (data[i][2]) {
                case '1':
                    stats.firstClass.totalP++;
                    stats.firstClass.fare+=parseInt(data[i][9]);
                    break;
                case '2':
                    stats.secondClass.totalP++;
                    stats.secondClass.fare+=parseInt(data[i][9]);
                    break;
                case '3':
                    stats.thirdClass.totalP++;
                    stats.thirdClass.fare+=parseInt(data[i][9]);
                    break;
            }
            if (data[i][5]?data[i][5]<18:data[i][5]) {
                stats.survived.children[parseInt(data[i][1])]++;
            } else {
                switch (data[i][4]) {
                    case 'male':
                        stats.survived.men[parseInt(data[i][1])]++;
                        break;
                    case 'female':
                        stats.survived.women[parseInt(data[i][1])]++;
                }
            }
        }
        console.log("Total fares: " + stats.firstClass.fare+stats.secondClass.fare+stats.thirdClass.fare + "\n" +
            "Average fare for 1 class: ", stats.firstClass.fare/stats.firstClass.totalP, "\n",
            "Average fare for 2 class: ", stats.secondClass.fare/stats.secondClass.totalP, "\n",
            "Average fare for 3 class: ", stats.thirdClass.fare/stats.thirdClass.totalP, "\n",
            "Survived: ", stats.survived.men[1]+stats.survived.women[1]+stats.survived.children[1],
            ",not survived: ", stats.survived.men[0]+stats.survived.women[0]+stats.survived.children[0], "\n",
            "Survived men: ", stats.survived.men[1], ",not survived men: ", stats.survived.men[0], "\n",
            "Survived women: ", stats.survived.women[1], ",not survived women: ", stats.survived.women[0], "\n",
            "Survived children: ", stats.survived.children[1], ",not survived children: ", stats.survived.children[0]
        );
    }
})