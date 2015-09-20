'use strict';

module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      default: true
    },
    code: DataTypes.STRING,
    account_type: {
      type: DataTypes.ENUM,
      values: [
        'Bank',
        'Account Receivable',
        'Current Asset',
        'Fixed Asset',
        'Other Asset',
        'Account Payaple',
        'Credit Card',
        'Long Term Liability',
        'Other Liability',
        'Equity',
        'Income',
        'Cost Of Goods Sold',
        'Expense',
        'Other Income',
        'Other Expense'
        ]
    },
    description: DataTypes.STRING,
    note: DataTypes.STRING,

  });
  //Belongs to Account as parent account


  return Account;
};
