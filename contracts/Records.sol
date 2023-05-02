// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Records {

    mapping(uint256 => fir) firList;
    mapping(uint => station) stationList;
    mapping(uint => officer) officerList;
    mapping(string => admin) adminList;
    mapping(string => uint) isAdmin;
    mapping(uint => criminal) criminalList;

    struct fir {
        string name;
        string phone;
        string email;
        string adhar;
        string complaint;
        string suspect;
        string date;
        string place;
        string[] crimes;
    }

    struct station {
        string name;
        string email;
        string phone;
        uint id;
        string stationaddress;
        string pincode;
    }

    struct officer {
        string name;
        string email;
        string phone;
        string adhar;
        uint id;
        string stationid;
    }

    struct admin {
        string name;
        string email;
        string phone;
        string adhar;
        string id;
    }

    struct criminal {
        string name;
        string phone;
        string adhar;
        uint id;
        uint firId;
        string []crimes;
    }

    function addFIR(uint256 id,string memory _name,string memory _phone,string memory _email,string memory _adhar,string memory _complaint,string memory _suspect,string memory _date,string memory _place, string[] memory crimes) public {
        fir memory cur;
        cur.name = _name;
        cur.phone = _phone;
        cur.email = _email;
        cur.adhar = _adhar;
        cur.complaint = _complaint;
        cur.suspect = _suspect;
        cur.date = _date;
        cur.place = _place;
        cur.crimes = crimes;

        firList[id] = cur;
    }

    function getFIR(uint256 _id) public view returns (fir memory){
        return firList[_id];
    }
    function addStation(string memory name,
        string memory email,
        string memory phone,
        uint id,
        string memory stationaddress,
        string memory pincode) public {

            station memory cur;
            cur.name= name;
            cur.email = email;
            cur.phone = phone;
            cur.id = id;
            cur.stationaddress = stationaddress;
            cur.pincode = pincode;

            stationList[id] = cur;
    }

    function getStation(uint id) public view returns (station memory){
        return stationList[id];
    }


    function addOfficer(string memory name,
        string memory email,
        string memory phone,
        string memory adhar,
        uint id,
        string memory stationid) public {

            officer memory cur;
            cur.name = name;
            cur.email = email;
            cur.phone= phone;
            cur.adhar = adhar;
            cur.id = id;
            cur.stationid = stationid;
            officerList[id] = cur;
        }

    function getOfficer(uint id) public view returns (officer memory){
        return officerList[id];
    }

    function addAdmin(string memory name,
        string memory email,
        string memory phone,
        string memory adhar,
        string memory id) public {
            admin memory cur;
            cur.name = name;
            cur.phone = phone;
            cur.email = email;
            cur.adhar = adhar;
            cur.id = id;
            adminList[id] = cur;
            isAdmin[id] = 1;
        }

    function getAdmin(string memory id) public view returns (admin memory){
        return adminList[id];
    }

    function checkAdmin(string memory id) public view returns (uint) {
        return isAdmin[id];
    }


    function addCriminal(string memory name,
        string memory phone,
        string memory adhar,
        uint id,
        uint firId) public {
            criminal memory cur;
            fir memory temp = firList[firId];
            cur.name = name;
            cur.phone = phone;
            cur.id = id;
            cur.adhar = adhar;
            cur.firId = firId;
            cur.crimes = temp.crimes;
            criminalList[id] = cur;

        }

    function getCriminal(uint id) public view returns (criminal memory){
        return criminalList[id];
    }

     constructor(){
        string[] memory temp = new string[](2);
        temp[0]="Theft";
        temp[1]="Assault";
        addFIR(12345,"abhishek","12345","abc@example.com","543321","phone stolen","short man","23/01/2020","lucknow",temp);
        addFIR(13346,"abhishek","12345","abc@example.com","5123321","phone stolen","short man","27/01/2020","lucknow",temp);
        addStation("EXPRESSWAY", "exp@example.com", "100", 1487, "Expressway, Noida", "201301");
        addOfficer("Abhishek", "abhi@example.com", "2417284123", "1262467612476", 2001, "1487");
        addAdmin("Admin1", "admin1@example.com", "72149216124", "6347126946128", "0x117B6314cBD99f80b6182FF846e4307427B9892e");
        addCriminal("Harsh", "2478122412", "1246891248128", 5555, 12345);
    }
    
}