import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DhiDataProvider {

  items;
  customers;
  warehouses;
  url = "http://ims.beta.deliveryhawaii.com/Services/Service1.svc/";

  constructor(public http: Http) {
    //this.getItemTypes2(); //
  }

getReceivingOrders(
  whseID: number, // -1 all waregouses
  custID: number // -1 all customers
){
  return this.http.get(this.url + "GetRcvReports?whseID="+ whseID);
}

  getReceivingOrder(orderID: number){
   return this.http.get(this.url + "GetReceivingOrder?OrderID="+ orderID);
  }

  getAilesWithSections(whseID: number){
    return this.http.get(this.url + `GetAilesWithSections?whseID=${whseID}`);
  }

  getAllShelvesInSection(){
    //(int whseID, int aisle, int section)
    return this.http.get(this.url + "getAllShelvesInSection?whseID=2&aisle=100&section=01");
  }

  getAllItemsInSection(){
    //(int whseID, int aisle, int section)
    return this.http.get(this.url + "GetAllItemsInSection?whseID=2&aisle=100&section=01");
  }

  getWarehouses() {
    return this.http.get(this.url + "GetWarehouses");

    // return [
    //   { name: "Maui", id: 0, selected: false },
    //   { name: "Oahu", id: 2, selected: true },
    //   { name: "Kona", id: 3, selected: false },
    //   { name: "Hilo", id: 4, selected: false },
    //   { name: "NYC", id: 8, selected: false },
    // ];
  }

  getCustomers(){
    return this.http.get(this.url + "GetCustomers2");
    //map(res => res.json()).subscribe(data => {
    //this.customers = data;
    //console.log("getCustomers", this.customers);})
  }

  getShipVias(){
    return this.http.get(this.url + "GetShipVias");
  }

  getLabelPrinters(){
    return this.http.get(this.url + "GetLabelPrinters");
  }

  getItemTypes2(){
    this.http.get(this.url + "GetTypes").
    map(res => res.json()).subscribe(data => {
    this.items = data;
    console.log("getItemTypes2", this.items);})

    }

  getItemTypes() {
    return [
      {
        "ID": 1,
        "Type": "Unknown",
        "IsActive": 1,
        "ShortName": "Unk"
      },
      {
        "ID": 6,
        "Type": "Activity Guide",
        "IsActive": 1,
        "ShortName": "HAG2"
      },
      {
        "ID": 7,
        "Type": "Activity Guide - Custom",
        "IsActive": 1,
        "ShortName": "HAGC"
      },
      {
        "ID": 8,
        "Type": "Island Orientation - Waikoloa Marriott",
        "IsActive": 1,
        "ShortName": "IOWM"
      },
      {
        "ID": 9,
        "Type": "Marketing Materials",
        "IsActive": 1,
        "ShortName": "MM"
      },
      {
        "ID": 10,
        "Type": "Marketing Materials - Outrigger",
        "IsActive": 1,
        "ShortName": "MktgO"
      },
      {
        "ID": 11,
        "Type": "Office Supplies",
        "IsActive": 1,
        "ShortName": "OS"
      },
      {
        "ID": 12,
        "Type": "Packaging Materials",
        "IsActive": 1,
        "ShortName": "PkgMtl"
      },
      {
        "ID": 13,
        "Type": "Product",
        "IsActive": 1,
        "ShortName": "Prdt"
      },
      {
        "ID": 14,
        "Type": "Carton",
        "IsActive": 1,
        "ShortName": "Ctn"
      },
      {
        "ID": 18,
        "Type": "Cleaning Supplies",
        "IsActive": 1,
        "ShortName": "CS"
      },
      {
        "ID": 19,
        "Type": "Box",
        "IsActive": 1,
        "ShortName": "Bx"
      },
      {
        "ID": 20,
        "Type": "Label",
        "IsActive": 1,
        "ShortName": "Lbl"
      },
      {
        "ID": 22,
        "Type": "Wolf",
        "IsActive": 0,
        "ShortName": "wlf"
      },
      {
        "ID": 23,
        "Type": "Customer Owned",
        "IsActive": 1,
        "ShortName": "CO"
      },
      {
        "ID": 24,
        "Type": "Informational",
        "IsActive": 1,
        "ShortName": "Info"
      },
      {
        "ID": 25,
        "Type": "Kit",
        "IsActive": 1,
        "ShortName": "Kt"
      },
      {
        "ID": 26,
        "Type": "Internet",
        "IsActive": 1,
        "ShortName": "Inet"
      },
      {
        "ID": 27,
        "Type": "Delivery",
        "IsActive": 1,
        "ShortName": "Del"
      },
      {
        "ID": 28,
        "Type": "Uniforms",
        "IsActive": 1,
        "ShortName": "Unf"
      },
      {
        "ID": 29,
        "Type": "Test Item",
        "IsActive": 1,
        "ShortName": "Test"
      },
      {
        "ID": 30,
        "Type": "Logo Apparel",
        "IsActive": 1,
        "ShortName": "LA"
      },
      {
        "ID": 31,
        "Type": "Toy",
        "IsActive": 1,
        "ShortName": "Ty"
      },
      {
        "ID": 32,
        "Type": "Bag",
        "IsActive": 1,
        "ShortName": "Bg"
      },
      {
        "ID": 33,
        "Type": "Case",
        "IsActive": 1,
        "ShortName": "Cse"
      },
      {
        "ID": 35,
        "Type": "Poster",
        "IsActive": 1,
        "ShortName": "Pstr"
      },
      {
        "ID": 36,
        "Type": "Video",
        "IsActive": 1,
        "ShortName": "DVD"
      },
      {
        "ID": 37,
        "Type": "Audio",
        "IsActive": 1,
        "ShortName": "CD"
      },
      {
        "ID": 38,
        "Type": "Kit Component",
        "IsActive": 1,
        "ShortName": "Cmpt"
      },
      {
        "ID": 39,
        "Type": "Finished Kit",
        "IsActive": 1,
        "ShortName": "FKit"
      },
      {
        "ID": 40,
        "Type": "Capsules",
        "IsActive": 1,
        "ShortName": "Pill"
      },
      {
        "ID": 41,
        "Type": "Empty Container",
        "IsActive": 1,
        "ShortName": "ECon"
      },
      {
        "ID": 42,
        "Type": "Promo Bag",
        "IsActive": 1,
        "ShortName": "ProBg"
      },
      {
        "ID": 43,
        "Type": "Make Up",
        "IsActive": 1,
        "ShortName": "MakeUp"
      },
      {
        "ID": 44,
        "Type": "Comsumable Goods",
        "IsActive": 1,
        "ShortName": "CSG"
      },
      {
        "ID": 45,
        "Type": "Samples",
        "IsActive": 1,
        "ShortName": "Samp"
      },
      {
        "ID": 46,
        "Type": "Copy Paper",
        "IsActive": 1,
        "ShortName": "CP"
      },
      {
        "ID": 47,
        "Type": "Sheets",
        "IsActive": 1,
        "ShortName": "Shts"
      },
      {
        "ID": 48,
        "Type": "Package Paper",
        "IsActive": 1,
        "ShortName": "PkgPap"
      },
      {
        "ID": 49,
        "Type": "Skid Paper",
        "IsActive": 1,
        "ShortName": "SkdPap"
      },
      {
        "ID": 51,
        "Type": "Food Supplies",
        "IsActive": 1,
        "ShortName": "FSP"
      },
      {
        "ID": 52,
        "Type": "Skirt",
        "IsActive": 1,
        "ShortName": "Skt"
      },
      {
        "ID": 53,
        "Type": "Dress",
        "IsActive": 1,
        "ShortName": "Drs"
      },
      {
        "ID": 54,
        "Type": "Heat Transfer",
        "IsActive": 1,
        "ShortName": "HtTrn"
      },
      {
        "ID": 55,
        "Type": "Collar",
        "IsActive": 1,
        "ShortName": "Cllr"
      },
      {
        "ID": 56,
        "Type": "Lease",
        "IsActive": 1,
        "ShortName": "Lse"
      },
      {
        "ID": 57,
        "Type": "Treat",
        "IsActive": 1,
        "ShortName": "Trt"
      },
      {
        "ID": 58,
        "Type": "Harness",
        "IsActive": 1,
        "ShortName": "Hrns"
      },
      {
        "ID": 59,
        "Type": "Leash",
        "IsActive": 1,
        "ShortName": "Lsh"
      },
      {
        "ID": 60,
        "Type": "T-Shirt",
        "IsActive": 1,
        "ShortName": "T-Sht"
      },
      {
        "ID": 61,
        "Type": "Briefcase / Bags",
        "IsActive": 1,
        "ShortName": "BBs"
      },
      {
        "ID": 62,
        "Type": "Golf Balls",
        "IsActive": 1,
        "ShortName": "GB"
      },
      {
        "ID": 63,
        "Type": "Golf Products",
        "IsActive": 1,
        "ShortName": "GP"
      },
      {
        "ID": 64,
        "Type": "Umbrellas",
        "IsActive": 1,
        "ShortName": "UM"
      },
      {
        "ID": 65,
        "Type": "Automotive",
        "IsActive": 1,
        "ShortName": "AU"
      },
      {
        "ID": 66,
        "Type": "Drinkware",
        "IsActive": 1,
        "ShortName": "DW"
      },
      {
        "ID": 67,
        "Type": "Writing Instruments",
        "IsActive": 1,
        "ShortName": "WI"
      },
      {
        "ID": 68,
        "Type": "Office ",
        "IsActive": 1,
        "ShortName": "OF"
      },
      {
        "ID": 69,
        "Type": "Home/Kitchen",
        "IsActive": 1,
        "ShortName": "HK-"
      },
      {
        "ID": 70,
        "Type": "Tech/Mobile",
        "IsActive": 1,
        "ShortName": "TM"
      },
      {
        "ID": 71,
        "Type": "Flashlights",
        "IsActive": 1,
        "ShortName": "FL"
      },
      {
        "ID": 72,
        "Type": "Misc. Giveaways",
        "IsActive": 1,
        "ShortName": "MG"
      },
      {
        "ID": 73,
        "Type": "Ornaments",
        "IsActive": 1,
        "ShortName": "ORN"
      },
      {
        "ID": 74,
        "Type": "Embroidered Bags",
        "IsActive": 1,
        "ShortName": "EB"
      },
      {
        "ID": 75,
        "Type": "Patch Of Shade Ornaments",
        "IsActive": 1,
        "ShortName": "POSORN"
      },
      {
        "ID": 76,
        "Type": "Ceramics",
        "IsActive": 1,
        "ShortName": "CRMS"
      },
      {
        "ID": 77,
        "Type": "Painted Leather Coin Purses",
        "IsActive": 1,
        "ShortName": "PLCP"
      },
      {
        "ID": 78,
        "Type": "Votives",
        "IsActive": 1,
        "ShortName": "VOT"
      },
      {
        "ID": 79,
        "Type": "Kids Hooks",
        "IsActive": 1,
        "ShortName": "KH"
      },
      {
        "ID": 80,
        "Type": "Customizable Ornaments",
        "IsActive": 1,
        "ShortName": "CORN"
      },
      {
        "ID": 81,
        "Type": "Ornament Displays",
        "IsActive": 1,
        "ShortName": "ORND"
      },
      {
        "ID": 82,
        "Type": "2-Pak",
        "IsActive": 1,
        "ShortName": "2Pak"
      },
      {
        "ID": 83,
        "Type": "Single",
        "IsActive": 1,
        "ShortName": "Sngl"
      },
      {
        "ID": 84,
        "Type": "XXL",
        "IsActive": 1,
        "ShortName": "2XL"
      },
      {
        "ID": 85,
        "Type": "2 Toddler",
        "IsActive": 1,
        "ShortName": "2T"
      },
      {
        "ID": 86,
        "Type": "Amazon",
        "IsActive": 1,
        "ShortName": "Amzn"
      },
      {
        "ID": 87,
        "Type": "Youth",
        "IsActive": 1,
        "ShortName": "Y"
      },
      {
        "ID": 88,
        "Type": "Womens",
        "IsActive": 1,
        "ShortName": "W"
      },
      {
        "ID": 89,
        "Type": "Mens",
        "IsActive": 1,
        "ShortName": "M"
      },
      {
        "ID": 90,
        "Type": "Akamai Card Holder",
        "IsActive": 1,
        "ShortName": "ACH-"
      },
      {
        "ID": 91,
        "Type": "Kaulua Wallet",
        "IsActive": 1,
        "ShortName": "KW"
      },
      {
        "ID": 93,
        "Type": "Internet Product",
        "IsActive": 1,
        "ShortName": "IP"
      },
      {
        "ID": 94,
        "Type": "Amplifiers, Pads & Eq",
        "IsActive": 1,
        "ShortName": "APE"
      },
      {
        "ID": 95,
        "Type": "Node Split",
        "IsActive": 1,
        "ShortName": "NS"
      },
      {
        "ID": 96,
        "Type": "Trunk And Distribution Coax",
        "IsActive": 1,
        "ShortName": "TDC"
      },
      {
        "ID": 97,
        "Type": "Line Gear",
        "IsActive": 1,
        "ShortName": "LG"
      },
      {
        "ID": 98,
        "Type": "Addressable Taps",
        "IsActive": 1,
        "ShortName": "AT"
      },
      {
        "ID": 99,
        "Type": "Pull-Boxes & Cabinets",
        "IsActive": 1,
        "ShortName": "PBC"
      },
      {
        "ID": 100,
        "Type": "Power Supplies, Peds & Aerial Cabs",
        "IsActive": 1,
        "ShortName": "PSPAC"
      },
      {
        "ID": 101,
        "Type": "Aerial Construction Hardware",
        "IsActive": 1,
        "ShortName": "ACH"
      },
      {
        "ID": 102,
        "Type": "Sub-Duct & Fiber",
        "IsActive": 1,
        "ShortName": "SDF"
      },
      {
        "ID": 103,
        "Type": "Fiber Splicing",
        "IsActive": 1,
        "ShortName": "FS_"
      },
      {
        "ID": 104,
        "Type": "Fttx",
        "IsActive": 1,
        "ShortName": "Ftx"
      },
      {
        "ID": 105,
        "Type": "Misc Fiber Parts",
        "IsActive": 1,
        "ShortName": "MFP"
      },
      {
        "ID": 106,
        "Type": "Indoor / Mdu Parts",
        "IsActive": 1,
        "ShortName": "IMDUP"
      },
      {
        "ID": 107,
        "Type": "Typical Pre-Wire",
        "IsActive": 1,
        "ShortName": "TPW"
      },
      {
        "ID": 108,
        "Type": "Haseko Template",
        "IsActive": 1,
        "ShortName": "HT"
      },
      {
        "ID": 109,
        "Type": "Actus Template / Smart Wire Homes",
        "IsActive": 1,
        "ShortName": "ATSWH"
      },
      {
        "ID": 111,
        "Type": "New Node",
        "IsActive": 1,
        "ShortName": "NN"
      },
      {
        "ID": 113,
        "Type": "Polo Shirt",
        "IsActive": 1,
        "ShortName": "Polo"
      },
      {
        "ID": 114,
        "Type": "Cap",
        "IsActive": 1,
        "ShortName": "Cap"
      },
      {
        "ID": 115,
        "Type": "unk2",
        "IsActive": 1,
        "ShortName": "u"
      },
      {
        "ID": 118,
        "Type": "Apparel",
        "IsActive": 1,
        "ShortName": "Apl"
      },
      {
        "ID": 119,
        "Type": "Miscellaneous",
        "IsActive": 1,
        "ShortName": "Misc"
      },
      {
        "ID": 120,
        "Type": "Feet",
        "IsActive": 1,
        "ShortName": "FT"
      },
      {
        "ID": 121,
        "Type": "Bar Soap",
        "IsActive": 1,
        "ShortName": "BS"
      },
      {
        "ID": 122,
        "Type": "Bath Salts",
        "IsActive": 1,
        "ShortName": "BSA"
      },
      {
        "ID": 123,
        "Type": "Body Butter",
        "IsActive": 1,
        "ShortName": "BB"
      },
      {
        "ID": 124,
        "Type": "Body Mist",
        "IsActive": 1,
        "ShortName": "BM"
      },
      {
        "ID": 125,
        "Type": "Candles",
        "IsActive": 1,
        "ShortName": "CA"
      },
      {
        "ID": 126,
        "Type": "Coco Loofah",
        "IsActive": 1,
        "ShortName": "CSLO"
      },
      {
        "ID": 127,
        "Type": "Florida Bar Soap",
        "IsActive": 1,
        "ShortName": "FBS"
      },
      {
        "ID": 128,
        "Type": "Florida Loofah Soap",
        "IsActive": 1,
        "ShortName": "FLS"
      },
      {
        "ID": 129,
        "Type": "Gift Set",
        "IsActive": 1,
        "ShortName": "GS"
      },
      {
        "ID": 130,
        "Type": "Lotion - Hand & Body ",
        "IsActive": 1,
        "ShortName": "LHB"
      },
      {
        "ID": 131,
        "Type": "Specialty Soaps",
        "IsActive": 1,
        "ShortName": "SS"
      },
      {
        "ID": 132,
        "Type": "Lip Balm",
        "IsActive": 1,
        "ShortName": "LB"
      },
      {
        "ID": 133,
        "Type": "Loofah Soap",
        "IsActive": 1,
        "ShortName": "LS"
      },
      {
        "ID": 134,
        "Type": "Boxed Soap",
        "IsActive": 1,
        "ShortName": "BXS"
      },
      {
        "ID": 135,
        "Type": "Travel Tin Candle",
        "IsActive": 1,
        "ShortName": "TTC"
      },
      {
        "ID": 136,
        "Type": "SunScreen",
        "IsActive": 1,
        "ShortName": "SNS"
      },
      {
        "ID": 137,
        "Type": "Tester Body Butter",
        "IsActive": 1,
        "ShortName": "TBB"
      },
      {
        "ID": 138,
        "Type": "Tester Lotion",
        "IsActive": 1,
        "ShortName": "TL"
      },
      {
        "ID": 139,
        "Type": "Tester Body Mist",
        "IsActive": 1,
        "ShortName": "TBM"
      },
      {
        "ID": 140,
        "Type": "Hikiwale Wallet Purse",
        "IsActive": 1,
        "ShortName": "HWP"
      },
      {
        "ID": 141,
        "Type": "Pahu Hao Wallet",
        "IsActive": 1,
        "ShortName": "PHW"
      },
      {
        "ID": 142,
        "Type": "Glass Display",
        "IsActive": 1,
        "ShortName": "GD"
      },
      {
        "ID": 143,
        "Type": "Wallet",
        "IsActive": 1,
        "ShortName": "Wlt"
      },
      {
        "ID": 144,
        "Type": "Market Street Wallet",
        "IsActive": 1,
        "ShortName": "MS"
      },
      {
        "ID": 145,
        "Type": "Cross Body Bag",
        "IsActive": 1,
        "ShortName": "CB"
      },
      {
        "ID": 146,
        "Type": "Double Zipper Pouch",
        "IsActive": 1,
        "ShortName": "DZ"
      },
      {
        "ID": 147,
        "Type": "Hobo",
        "IsActive": 1,
        "ShortName": "HB"
      },
      {
        "ID": 148,
        "Type": "Mini Crossbody",
        "IsActive": 1,
        "ShortName": "MCB"
      },
      {
        "ID": 149,
        "Type": "Taxi Wallet",
        "IsActive": 1,
        "ShortName": "TW"
      },
      {
        "ID": 150,
        "Type": "Flavor Powders 1",
        "IsActive": 1,
        "ShortName": "FP"
      },
      {
        "ID": 151,
        "Type": "Flavor Powders 2",
        "IsActive": 1,
        "ShortName": "FS"
      },
      {
        "ID": 152,
        "Type": "Juice Syrups",
        "IsActive": 1,
        "ShortName": "SE"
      },
      {
        "ID": 153,
        "Type": "Tapioca Pearls",
        "IsActive": 1,
        "ShortName": "TPS"
      },
      {
        "ID": 154,
        "Type": "Tea",
        "IsActive": 1,
        "ShortName": "TB"
      },
      {
        "ID": 155,
        "Type": "Supplies Equipment",
        "IsActive": 1,
        "ShortName": "SP"
      },
      {
        "ID": 156,
        "Type": "Coconut Meat",
        "IsActive": 1,
        "ShortName": "CM"
      },
      {
        "ID": 157,
        "Type": "Home Kit",
        "IsActive": 1,
        "ShortName": "HK"
      },
      {
        "ID": 158,
        "Type": "Business Kit",
        "IsActive": 1,
        "ShortName": "BK"
      },
      {
        "ID": 159,
        "Type": "Display",
        "IsActive": 1,
        "ShortName": "Dspl"
      },
      {
        "ID": 160,
        "Type": "Silver Travel Tin",
        "IsActive": 1,
        "ShortName": "STT"
      },
      {
        "ID": 161,
        "Type": "Body Lotion",
        "IsActive": 1,
        "ShortName": "BL"
      },
      {
        "ID": 162,
        "Type": "Tester Body Lotion",
        "IsActive": 1,
        "ShortName": "TBL"
      },
      {
        "ID": 163,
        "Type": "Pebbled Kaulua Wallet",
        "IsActive": 1,
        "ShortName": "PKW"
      },
      {
        "ID": 164,
        "Type": "Pebbled Pahu Wallet",
        "IsActive": 1,
        "ShortName": "PPW"
      },
      {
        "ID": 165,
        "Type": "Pebbled Wallet",
        "IsActive": 1,
        "ShortName": "PW"
      },
      {
        "ID": 166,
        "Type": "Menu Card",
        "IsActive": 1,
        "ShortName": "MC"
      },
      {
        "ID": 167,
        "Type": "Packaging",
        "IsActive": 1,
        "ShortName": "Pkg"
      },
      {
        "ID": 168,
        "Type": "For Your Home & Office",
        "IsActive": 1,
        "ShortName": "FYHO"
      },
      {
        "ID": 169,
        "Type": "For You & Your Stay",
        "IsActive": 1,
        "ShortName": "FYYS"
      },
      {
        "ID": 170,
        "Type": "Food & Beverage",
        "IsActive": 1,
        "ShortName": "FB"
      },
      {
        "ID": 171,
        "Type": "Print",
        "IsActive": 1,
        "ShortName": "Prnt"
      },
      {
        "ID": 172,
        "Type": "Promo",
        "IsActive": 1,
        "ShortName": "Prmo"
      },
      {
        "ID": 173,
        "Type": "Pallet",
        "IsActive": 1,
        "ShortName": "Plt"
      },
      {
        "ID": 174,
        "Type": "Skin Care",
        "IsActive": 1,
        "ShortName": "SC"
      },
      {
        "ID": 175,
        "Type": "Eddie Bauer",
        "IsActive": 1,
        "ShortName": "EdBr"
      },
      {
        "ID": 176,
        "Type": "Kapalua Ritz",
        "IsActive": 1,
        "ShortName": "KR"
      },
      {
        "ID": 177,
        "Type": "Base",
        "IsActive": 1,
        "ShortName": "Base"
      },
      {
        "ID": 178,
        "Type": "Dynamic",
        "IsActive": 1,
        "ShortName": "Dync"
      },
      {
        "ID": 179,
        "Type": "Tri-fold Wallet",
        "IsActive": 1,
        "ShortName": "TFW"
      },
      {
        "ID": 180,
        "Type": "Small Cuff",
        "IsActive": 1,
        "ShortName": "S_Cuff"
      },
      {
        "ID": 181,
        "Type": "Tea Pouch",
        "IsActive": 1,
        "ShortName": "TP"
      },
      {
        "ID": 182,
        "Type": "Supplements",
        "IsActive": 1,
        "ShortName": "Sup"
      },
      {
        "ID": 183,
        "Type": "HNC Body",
        "IsActive": 1,
        "ShortName": "HNC"
      },
      {
        "ID": 184,
        "Type": "Herb Beverage",
        "IsActive": 1,
        "ShortName": "HRB"
      },
      {
        "ID": 185,
        "Type": "Visor",
        "IsActive": 1,
        "ShortName": "Vsr"
      },
      {
        "ID": 186,
        "Type": "Hat",
        "IsActive": 1,
        "ShortName": "Hat"
      },
      {
        "ID": 187,
        "Type": "Rashguard",
        "IsActive": 1,
        "ShortName": "Rash"
      },
      {
        "ID": 188,
        "Type": "SunShade",
        "IsActive": 1,
        "ShortName": "SSH"
      },
      {
        "ID": 189,
        "Type": "Womens-Skorts",
        "IsActive": 1,
        "ShortName": "WSK"
      },
      {
        "ID": 190,
        "Type": "Womens-Shorts",
        "IsActive": 1,
        "ShortName": "WSH"
      },
      {
        "ID": 191,
        "Type": "Womens-Jackets",
        "IsActive": 1,
        "ShortName": "WJ"
      },
      {
        "ID": 192,
        "Type": "Womens-Capris",
        "IsActive": 1,
        "ShortName": "WC"
      },
      {
        "ID": 193,
        "Type": "Mens-Shorts",
        "IsActive": 1,
        "ShortName": "MSH"
      },
      {
        "ID": 194,
        "Type": "Mens-Swimwear",
        "IsActive": 1,
        "ShortName": "MSW"
      },
      {
        "ID": 195,
        "Type": "Womens-Sweatshirts",
        "IsActive": 1,
        "ShortName": "WSS"
      },
      {
        "ID": 196,
        "Type": "Mens-Jackets",
        "IsActive": 1,
        "ShortName": "MJ"
      },
      {
        "ID": 197,
        "Type": "Womens-Skirts",
        "IsActive": 1,
        "ShortName": "WSKS"
      },
      {
        "ID": 198,
        "Type": "Mens-Sweatshirts",
        "IsActive": 1,
        "ShortName": "MSS"
      },
      {
        "ID": 199,
        "Type": "Mens-",
        "IsActive": 1,
        "ShortName": "Mens-"
      }
    ]
  }
}
