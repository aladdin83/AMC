'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Patient', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    // Personal Info
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middle_name:{
      type: DataTypes.STRING,
      allowNull: true  
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male','female']
    },
    language: DataTypes.STRING,
    occupation: DataTypes.STRING,
    father_name: DataTypes.STRING,
    nationality: DataTypes.STRING,
    religion: DataTypes.STRING,
    place_of_birth: DataTypes.STRING,
    
    // Family
    maritial_status: {
      type: DataTypes.ENUM,
      values: ['Married', 'Single', 
              'Divorced', 'Widowed']
    },
    spouse_name: DataTypes.STRING,
    spouse_mobile: DataTypes.STRING,
    guardian_name: DataTypes.STRING,
    guardian_relation: DataTypes.STRING,
    guardian_phone: DataTypes.STRING,
    
    //Emergency Contact
    emergency_contact_name: DataTypes.STRING,
    emergency_contact_mobile: DataTypes.STRING,
    emergency_contact_relation: DataTypes.STRING,
    
    
    // Contact Information
    mobile: DataTypes.STRING,
    home_phone: DataTypes.STRING,
    work_phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    prefered_contact_method: {
      type: DataTypes.ENUM,
      values: ['Mobile', 'Home Phone', 'Work Phone', 'Email', 'SMS']
    },
    
    //Address
    home_address: DataTypes.TEXT,
    home_street: DataTypes.STRING,
    home_city: DataTypes.STRING,
    
    work_address: DataTypes.TEXT,
    work_street: DataTypes.STRING,
    work_city: DataTypes.STRING,
    pobox: DataTypes.STRING,
    
    //Insurance Information
    insurance_company: DataTypes.STRING,
    insurance_fund: DataTypes.STRING,
    insurance_fund_no: DataTypes.STRING,
    insurance_info: DataTypes.TEXT,
    
    //Medical Information
    blood_type: {
      type: DataTypes.ENUM,
      values: ['A', 'B', 'AB','O'],
    },
    blood_rh: {
      type: DataTypes.ENUM,
      values: ['+', '-']
    },
    allergies: DataTypes.TEXT,
    major_illness: DataTypes.TEXT,
    
    //Additional Information
    additional_info: DataTypes.TEXT,
    
    // Getters Setters
  },
  {
    getterMethods: {
      fullName: function(){
          var fullName = [
            this.getDataValue('title'),
            this.getDataValue('first_name'),
            this.getDataValue('middle_name'),
            this.getDataValue('last_name')
          ]
          return fullName.join(' ');
        },
        age: function(){
          var birthday = new Date(this.getDataValue('birthday'));
          var today = new Date();
          return (today.getFullYear() - birthday.getFullYear());
        }
      }  
  });
};
