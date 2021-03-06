

export class ErrorList {

  public codes: any = {
    101: { msg: "Invalid Username" },
    102: { msg: "Invalid Password" },
    107: { msg: "Something went wrong, Please contact GST Edge Team" },
    108: { msg: "Invalid login credential" },
    111: { msg: "GSTIN is not registered to this GSP" },
    207: { msg: "Invalid Invoice Date" },
    208: { msg: "Invalid Supplier (FROM) GSTIN" },
    212: { msg: "Invalid Consignee (TO) GSTIN" },
    216: { msg: "Invalid HSN Code" },
    217: { msg: "Invalid UQC Code" },
    222: { msg: "Invalid Transporter Id" },
    224: { msg: "Invalid Transport Date" },
    225: { msg: "Invalid Vehicle Number Format" },
    238: { msg: "Invalid auth token" },
    240: { msg: "Could not generate eway bill, Please contact GST Edge team" },
    301: { msg: "Invalid eway bill number" },
    309: { msg: "Could not update vehicle details, Please contact GST Edge team" },
    311: { msg: "Validity period lapsed, you cannot update vehicle details" },
    312: { msg: "This eway bill is either not generated by you or cancelled" },
    315: { msg: "Validity period lapsed, you cannot cancel this eway bill" },
    316: { msg: "Eway bill is already verified, you cannot cancel it" },
    317: { msg: "Could not cancel eway bill, please contact GST Edge team" },
    326: { msg: "Could not retrieve GSTIN details for the given GSTIN number" },
    328: { msg: "Could not retrieve transporter details from gstin" },
    359: { msg: "User GSTIN should match to GSTIN(from) for outward transactions" },
    360: { msg: "User GSTIN should match to GSTIN(to) for inward transactions" },
    363: { msg: "E-way bill is not enabled for intra state movement for you state" },
    306: { msg: "Invalid from state" },
    307: { msg: "Invalid reason" },
    308: { msg: "Invalid remarks" },
    215: { msg: "Invalid Consignee (TO) State Code" },
    211: { msg: "Invalid or Blank Supplier (FROM) state Code" },
    100: { msg: "Invalid Json" },
    105: { msg: "Invalid Token" },
    106: { msg: "Token Expired" },
    201: { msg: "Invalid Supply Type" },
    202: { msg: "Invalid Sub-supply Type" },
    203: { msg: "Sub-transaction type does not belongs to transaction type" },
    204: { msg: "Invalid Document type" },
    205: { msg: "Document type does not match with transaction & Sub trans type" },
    206: { msg: "Invalid Invoice Number" },
    210: { msg: "Invalid or Blank Supplier(FROM)  PIN Code" },
    209: { msg: "Blank Supplier (FROM) Address" },
    213: { msg: "Invalid Consignee(TO) Address" },
    214: { msg: "Invalid Consignee (TO) PIN Code" },
    218: { msg: "Invalid Tax Rate for Intra State Transaction" },
    219: { msg: "Invalid Tax Rate for Inter State Transaction" },
    220: { msg: "Invalid Transportation mode" },
    221: { msg: "Invalid Approximate Distance" },
    226: { msg: "Both Transport and Vehicle Number Blank" },
    223: { msg: "Invalid Transport Document Number" },
    227: { msg: "User (Generator) Gstin cannot be blank" },
    228: { msg: "User id cannot be blank" },
    229: { msg: "Supplier name is required" },
    230: { msg: "Supplier place is required" },
    231: { msg: "Consignee name is required" },
    232: { msg: "Consignee place is required" },
    233: { msg: "Eway bill does not contain any items" },
    234: { msg: "Total amount/Taxable amount is mandatory" },
    235: { msg: "Tax rates for Intra state transaction is blank" },
    236: { msg: "Tax rates for Inter state transaction is blank" },
    237: { msg: "Invalid client -Id/client-secret" },
    239: { msg: "Invalid action" },
    302: { msg: "Invalid transporter mode" },
    303: { msg: "Vehicle number is required" },
    304: { msg: "Invalid vehicle format" },
    305: { msg: "Place from is required" },
    320: { msg: "Invalid state to" },
    321: { msg: "Invalid place to" },
    322: { msg: "Could not generate consolidated eway bill" },
    325: { msg: "Could not retrieve data" },
    327: { msg: "Could not retrieve data from hsn" },
    329: { msg: "Could not retrieve States List" },
    330: { msg: "Could not retrieve UQC list" },
    331: { msg: "Could not retrieve Error code" },
    334: { msg: "Could not retrieve user details by userid " },
    336: { msg: "Could not retrieve transporter data by gstin" },
    337: { msg: "Could not retrieve HSN details for the given HSN number" },
    350: { msg: "Could not generate consolidated eway bill" },
    357: { msg: "Could not retrieve eway bill details, pl. contact helpdesk" },
    358: { msg: "GSTIN passed in request header is not matching with the user gstin mentioned in payload JSON" },
    361: { msg: "Invalid Vehicle Type" },
    362: { msg: "Transporter document date cannot be earlier than the invoice date" }
  };

}