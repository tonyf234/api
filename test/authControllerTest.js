const authController = require('../src/controllers/authController');

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const User = require("../src/entities/userEntity");
const { expect } = chai;
const sqlite3 = require('sqlite3').verbose();


chai.use(sinonChai);

describe('Testing Controller', function () {

    it('test missing password or identifiant', async function() {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req_id = {
          body: {
            password: 'tester'
          }
        };

        const req_pwd = {
          body: {
            email: 'test',
          }
        };

        let res = {
          status_value: undefined,
          send_value: undefined,
          status: function(status) { this.status_value = status; return this },
          send: function(send) { this.send_value = send },
        };

        //check for missing email/phone
        await authController.signin(req_id, res, () => {})
        expect(res.send_value.phone_email).to.equal('need a email and/or a phone number');
        expect(res.status_value).to.equal(400);

        //check for missing password
        await authController.signin(req_pwd, res, () => {})
        expect(res.send_value.password).to.equal('password is missing');
        expect(res.status_value).to.equal(400);
        User.findOne.restore();
      });

    it('test signup missing arguments', async function() {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
          body: {
          }
        };

        let res = {
          status_value: undefined,
          send_value: undefined,
          status: function(status) { this.status_value = status; return this },
          send: function(send) { this.send_value = send },
        };

        await authController.signup(req, res, () => {})
        expect(res.send_value.lastname).to.equal( 'lastname is missing');
        expect(res.send_value.firstname).to.equal( 'firstname is missing');
        expect(res.send_value.phone_email).to.equal( 'need a email and/or a phone number');
        expect(res.send_value.password).to.equal( 'password is missing');
        expect(res.status_value).to.equal(400);
      });

    // open the database
    /*let db = new sqlite3.Database('../data/database.sqlite', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the database.');
    });

    db.serialize(() => {
      db.each(`SELECT PlaylistId as id,
                      Name as name
               FROM playlists`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row.id + "\t" + row.name);
      });
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });*/

});
