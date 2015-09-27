var sqldb = require('../../sqldb');
var people = require('./people');

var Patient = sqldb.Patient;

var patients = [];
for(var n in people){
   patients.push({
        title: people[n].title,
        first_name: people[n].first_name,
        middle_name: people[n].middle_name,
        last_name: people[n].last_name,
        birthday: people[n].birthday,
        gender: people[n].gender,
        language: 'English',
        occupation: people[n].occupation,
        father_name: people[n].father_name,
        nationality: people[n].nationality,
        religion: people[n].religion,
        place_of_birth: 'Hendersonville',
        maritial_status: 'Single',
        sopouse_name: '',
        spouse_mobile: '',
        emergency_contact_name: 'Florence L. Powell',
        emergency_contact_mobile: '810-679-8170',
        emergency_contact_relation: 'friend',
        mobile: '615-826-6047',
        home_phone: '615-826-6047',
        work_phone: '615-826-6047',
        email: 'CharlesDParker@jourrapide.com',
        home_address: '1251 Buffalo Creek RoadHendersonville, TN 37075',
        home_street: 'Creek Road',
        home_city: 'Buffalo',
        insurance_company: 'Blue Shield',
        insurance_fund: 'Red Shield',
        insurance_fund_no: '759-01-XXXX',
        insurance_info: '1Z W27 551 34 2370 985 9',
        blood_type: 'A',
        blood_rh: '+',
        allergies: 'Penicillin',
        major_illness: 'diabides',
        additional_info: ''
   })
}

Patient.sync()
  .then(function(){
    return Patient.destroy({where: {}});
  })
  .then(function(){
    Patient.bulkCreate(patients)
    .then(function(){
      console.log('finished populating Patients');
    });
  });