function randGender(){
    let random = Math.round(Math.random());
    return (random === 1) ? "male" : "female";
}
function randMaleName() {
    let maleNames = [
        "Mojmír", "Rudolf", "Vojtěch", "Martin", "Matej", "Matouš", "Matyáš", "Michal",
        "Mikuláš", "Tomáš", "Zdeněk", "Václav", "David", "Daniel", "Zbyněk", "František",
        "Adam", "Adolf", "Albert", "Alén", "Aleš", "Alexander", "Alois", "Jiří", "Josef"
    ];
    return maleNames[Math.round(Math.random() * (maleNames.length - 1))];
}
function randFemaleName(){
    let femaleNames = [
        "Eliška", "Anna", "Adéla", "Tereza", "Sofie", "Viktorie", "Ema", "Karolína",
        "Natálie", "Amálie", "Julie", "Kristýna", "Barbora", "Nela", "Laura", "Klára",
        "Emma", "Anežka", "Rozálie", "Sára", "Marie", "Lucie", "Aneta", "Zuzana", "Mia"];
    return femaleNames[Math.round(Math.random() * (femaleNames.length - 1))];
}

function randMaleSurname(){
    let maleSurnames = [
        "Adamcik", "Ambroz", "Anderle", "Apel", "Bartos", "Benes", "Blaha", "Bobal",
        "Cermak", "Chalupa", "Cipra", "Ctvrtnik", "Dana", "Dec", "Doubek", "Dvorak", "Ermis",
        "Fara", "Fiala", "Folta", "Fort", "France", "Fischer", "Gaba", "Galuska",
    ]
    return maleSurnames[Math.round(Math.random() * (maleSurnames.length - 1))];
}
function randFemaleSurname(){
    let femaleSurnames = [
        "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková",
        "Veselá", "Horáková", "Pokorná", "Marková", "Benešová", "Králová", "Fialová",
    ]
    return femaleSurnames[Math.round(Math.random() * (femaleSurnames.length - 1))];
}
function randWorkload(){
    let workloads = [10, 20, 30, 40];
    return workloads[Math.round(Math.random() * (workloads.length - 1))];
}
function randBirthday(age){
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let endDate = new Date();
    endDate.setFullYear(currentYear - age);
    let start = new Date();
    start.setFullYear(currentYear - age - 1);
    let birthday = new Date(start.getTime() + Math.random() * (endDate.getTime() - start.getTime()));
    return birthday.toISOString();
}
function randNumberBetweenTwo(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
function main(dtoIn){
    let workers = [];
    let randName;
    let randSurname;
    let randAge;
    let randomGender;
    for (let i = 0; i < dtoIn.count; i++) {
        randAge = randNumberBetweenTwo(dtoIn['age'].min, dtoIn['age'].max);
        randomGender = randGender();
        if (randomGender === "male") {
            randName = randMaleName();
            randSurname = randMaleSurname();
        } else {
            randName = randFemaleName();
            randSurname = randFemaleSurname();
        }
        const worker = {
            gender: randomGender,
            birthday: randBirthday(randAge),
            name: randName,
            surname: randSurname,
            workload: randWorkload()
        };
        workers.push(worker);
    }
    return workers;
}