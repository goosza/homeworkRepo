
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
function create_list(dtoIn){
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
function workloads(workers){
    let workloads = [0, 0, 0, 0];
    for (let i = 0; i < workers.length; i++){
        switch (workers[i].workload) {
            case 10: workloads[0]++; break;
            case 20: workloads[1]++; break;
            case 30: workloads[2]++; break;
            case 40: workloads[3]++; break;
        }
    }
    return workloads;
}

function returnAge(date){
    let currentDate = new Date();
    let birthdayDate = new Date(date);
    let age = currentDate.getFullYear() - birthdayDate.getFullYear();
    let month = currentDate.getMonth() - birthdayDate.getMonth();
    if (month < 0 || (month === 0 && currentDate.getDate() < birthdayDate.getDate())) {
        age--;
    }
    return age;
}
function min_max_avr_median_ages(workers){
    let stat_ages_arr = [0, 0, 0, 0];
    let length_w = workers.length;
    workers.sort(function(a, b){
        const date1 = new Date(a.birthday);
        const date2 = new Date(b.birthday);
        return date1 - date2;
    });
    let oldest_worker = workers[0];
    let youngest_worker = workers[length_w - 1];

    stat_ages_arr[0] = returnAge(youngest_worker.birthday);
    stat_ages_arr[1] = returnAge(oldest_worker.birthday);

    stat_ages_arr[2] = workers.reduce((total, next) => total + returnAge(next.birthday), 0)
        / length_w;

    stat_ages_arr[3] = (length_w % 2 !== 0)
        ? returnAge(workers[(length_w - (length_w % 2))/2].birthday)
        : (returnAge(workers[length_w/2].birthday) + returnAge(workers[length_w/2-1].birthday))/2;
    return stat_ages_arr;
}

function median_workload(workers){
    let length_w = workers.length;
    return (length_w % 2 !== 0) ? workers[(length_w - (length_w % 2))/2].workload
                                : (workers[length_w/2].workload + workers[length_w/2-1].workload)/2;

}
function avr_workload_fem(workers){
    let females = workers.filter(person => person.gender === 'female');
    return females.reduce((summary, next) => summary + next.workload, 0) / females.length;
}
function main(dtoIn){
    let workers = create_list(dtoIn);
    let total_workers = dtoIn.count;
    let workloads_arr = workloads(workers);
    let stat_ages_arr_var = min_max_avr_median_ages(workers);
    workers.sort(function(a, b){
        const workload1 = a.workload;
        const workload2 = b.workload;
        return workload1 - workload2;
    });
    let median_work = median_workload(workers);
    let avr_workload_fem_var = avr_workload_fem(workers);
    return {
        total: total_workers,
        workload10: workloads_arr[0],
        workload20: workloads_arr[1],
        workload30: workloads_arr[2],
        workload40: workloads_arr[3],
        averageAge: stat_ages_arr_var[2],
        minAge: stat_ages_arr_var[0],
        maxAge: stat_ages_arr_var[1],
        medianAge: stat_ages_arr_var[3],
        medianWorkload: median_work,
        averageWomenWorkload: avr_workload_fem_var,
        sortedByWorkload: workers
    };
}