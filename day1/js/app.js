const PATH = "../data/";
let resultBox;

window.addEventListener('load', () => {
    resultBox = document.querySelector("#result-box");
    day2_2();
});

const setResult = () => {

};

const readTextFile = (file) => {
    let fileToFetch = PATH + file;
    return new Promise(resolve => {
        fetch(fileToFetch)
            .then(response => response.text())
            .then(
                text => {
                    return resolve(text);
                }
            );
    });

};

async function day1_1() {
    let data = await readTextFile("day1.txt");
    data = data.split("\n");
    data = data.map(x => parseFloat(x));
    let result = 0;
    let previous;
    data.forEach(depth => {
        if (previous) {
            result += previous < depth ? 1 : 0;
        }
        previous = depth;
    });
    console.log(result);
}

async function day1_2() {
    let data = await readTextFile("day1.txt");
    data = data.split("\n");
    data = data.map(x => parseFloat(x));
    let oldSum = data[0] + data[1] + data[2];
    let result = 0;
    for (let index = 3; index < data.length; index++) {
        const first = data[index - 3];
        const last = data[index];
        const newSum = oldSum - first + last;
        result += oldSum < newSum ? 1 : 0;
    }
    console.log(result);
}

class Submarine {

    constructor(commands) {
        this.commands = commands;
        this.depth = 0;
        this.distance = 0;
    }

    reportLocation = () => {
        console.log("I am at depth : " + this.depth + "  And distance  : " + this.distance);
        console.log("Multiplied Value : " + this.depth * this.distance);
    }

    executeCommand = (command) => {
        command = command.split(' ');
        const direction = command[0];
        const distance = parseInt(command[1]);
        if (direction == "forward") {
            this.moveForward(distance);
        } else if (direction == "down") {
            this.dive(distance);
        } else {
            this.resurface(distance);
        }
        console.log("Moving " + direction + ".  " + distance + " Steps!");
    }

    processCommands = () => {
        this.commands = this.commands.split("\n");
        this.commands.forEach(command => {
            this.executeCommand(command);
        });
    }

    moveForward = (distance) => {
        this.distance += distance;
    };

    dive = (distance) => {
        this.depth += distance;
    };

    resurface = (distance) => {
        this.depth = this.depth - distance < 0 ? 0 : this.depth - distance;
    };
}

async function day2_1() {
    let data = await readTextFile("day2.txt");
    let submarine = new Submarine(data);
    submarine.processCommands();
    submarine.reportLocation();
}

class Submarine2000 {

    constructor(commands) {
        this.commands = commands;
        this.depth = 0;
        this.distance = 0;
        this.aim = 0;
    }

    reportLocation = () => {
        console.log("I am at depth : " + this.depth + "  And distance  : " + this.distance);
        console.log("Multiplied Value : " + this.depth * this.distance);
    }

    executeCommand = (command) => {
        command = command.split(' ');
        const direction = command[0];
        const distance = parseInt(command[1]);
        if (direction == "forward") {
            this.moveForward(distance);
        } else if (direction == "down") {
            this.dive(distance);
        } else {
            this.resurface(distance);
        }
        console.log("Moving " + direction + ".  " + distance + " Steps!");
        console.log("current depth : " + this.depth);
        console.log("current distance : " + this.distance);
        console.log("current aim : " + this.aim);
    }

    processCommands = () => {
        this.commands = this.commands.split("\n");
        this.commands.forEach(command => {
            this.executeCommand(command);
        });
    }

    moveForward = (distance) => {
        this.distance += distance;
        this.depth += this.aim * distance;
        if (this.depth < 0) {
            this.depth = 0;
        }
    };

    dive = (distance) => {
        this.aim += distance;
    };

    resurface = (distance) => {
        this.aim -= distance;
    };
}

async function day2_2() {
    let data = await readTextFile("day2.txt");
    let submarine = new Submarine2000(data);
    submarine.processCommands();
    submarine.reportLocation();
}
