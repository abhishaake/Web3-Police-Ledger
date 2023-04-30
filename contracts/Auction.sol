// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Auction {

    uint num = 1234;


    function getNum() public view returns(uint){
        return num;
    }

    function setNum(uint newNum) public {
        num = newNum;
    }
    
    constructor(){
        addFIR(12345,"abhishek","12345","abc@example.com","543321","phone stolen","short man","23/01/2020","lucknow");
        addFIR(13346,"abhishek","12345","abc@example.com","5123321","phone stolen","short man","27/01/2020","lucknow");
    }

    mapping(uint256 => fir) firList;
    
    struct fir {
        string name;
        string phone;
        string email;
        string adhar;
        string complaint;
        string suspect;
        string date;
        string place;
    }

    function addFIR(uint256 id,string memory _name,string memory _phone,string memory _email,string memory _adhar,string memory _complaint,string memory _suspect,string memory _date,string memory _place) public {
        fir memory cur;
        cur.name = _name;
        cur.phone = _phone;
        cur.email = _email;
        cur.adhar = _adhar;
        cur.complaint = _complaint;
        cur.suspect = _suspect;
        cur.date = _date;
        cur.place = _place;

        firList[id] = cur;
    }

    function getFIR(uint256 _id) public view returns (fir memory){
        return firList[_id];
    }
}