
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

function unique(value, index, self){
    return self.indexOf(value) === index;
}
function main(dtoIn){
    //creating the random list of workers.
    let workers = create_list(dtoIn);
    //creating the list of all names of workers. (not unique)
    const all_names = [];
    //creating the list of all male names of male workers. (not unique)
    let male_workers = workers.filter(person => person.gender === 'male');
    const male_names = [];
    //creating the list of all female names of female workers. (not unique)
    let female_workers = workers.filter(person => person.gender === 'female');
    const female_names = [];
    //creating the list of all female names of female workers. (not unique) working part-time
    let female_workers_pt = female_workers.filter(person => person.workload < 40);
    const female_names_pt = [];
    //creating the list of all male names of male workers. (not unique) working full-time
    let male_workers_ft = male_workers.filter(person => person.workload === 40);
    const male_names_ft = [];
    //adding.....
    workers.forEach(function(x){
        all_names.push(x.name);
    });
    male_workers.forEach(function(x){
        male_names.push(x.name);
    });
    female_workers.forEach(function(x){
        female_names.push(x.name);
    });
    female_workers_pt.forEach(function(x){
        female_names_pt.push(x.name);
    });
    male_workers_ft.forEach(function(x){
        male_names_ft.push(x.name);
    });
    //creating the objects containing the stats;
    const all_counts = {};
    const male_counts = {};
    const female_counts = {};
    const female_counts_pt = {};
    const male_counts_ft = {};
    //counting...
    all_names.forEach(function (x) { all_counts[x] = (all_counts[x] || 0) + 1; });
    male_names.forEach(function (x) { male_counts[x] = (male_counts[x] || 0) + 1; });
    female_names.forEach(function (x) { female_counts[x] = (female_counts[x] || 0) + 1; });
    female_names_pt.forEach(function (x) { female_counts_pt[x] = (female_counts_pt[x] || 0) + 1; });
    male_names_ft.forEach(function (x) { male_counts_ft[x] = (male_counts_ft[x] || 0) + 1; });

    // making arrays of field names (unique) to look for
    // the amounts of repeat the all_counts, male_counts,... etc. objects
    let all_names_unique = all_names.filter(unique);
    let male_names_unique = male_names.filter(unique);
    let female_names_unique = female_names.filter(unique);
    let female_names_pt_unique = female_names_pt.filter(unique);
    let male_names_ft_unique = male_names_ft.filter(unique);

    let all_names_structured = [];
    let male_names_structured = [];
    let female_names_structured = [];
    let female_names_pt_structured = [];
    let male_names_ft_structured = [];

    all_names_unique.forEach(function(x) {
        all_names_structured.push({
            label: x,
            value: all_counts[x]
        })
    });
    male_names_unique.forEach(function(x) {
        male_names_structured.push({
            label: x,
            value: male_counts[x]
        })
    });
    female_names_unique.forEach(function(x) {
        female_names_structured.push({
            label: x,
            value: female_counts[x]
        })
    });
    female_names_pt_unique.forEach(function(x) {
        female_names_pt_structured.push({
            label: x,
            value: female_counts_pt[x]
        })
    });
    male_names_ft_unique.forEach(function(x) {
        male_names_ft_structured.push({
            label: x,
            value: male_counts_ft[x]
        })
    });
    return {
        names: {
            all: all_counts,
            male: male_counts,
            female: female_counts,
            femalePartTime: female_counts_pt,
            maleFullTime: male_counts_ft
        },
        chartData: {
            all: all_names_structured,
            male: male_names_structured,
            female: female_names_structured,
            femalePartTime: female_names_pt_structured,
            maleFullTime: male_names_ft_structured
        }
    };

}