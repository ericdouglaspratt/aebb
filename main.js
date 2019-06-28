// next steps:
//  - geolocation + blue dot
//  - react conversion, interaction between trip list and map and vice versa
//  - mobile solution for trip list
//  - ability to plan routes and visualize, dotted line maybe

var stations = [
  {
    "id": 3,
    "name": "Colleges of the Fenway - Fenway at Avenue Louis Pasteur",
    "lat": 42.34011512249236,
    "long": -71.10061883926392,
    "photo": "photos/colleges-of-the-fenway.jpg"
  },
  {
    "id": 4,
    "name": "Tremont St at E Berkeley St",
    "lat": 42.345392,
    "long": -71.069616,
    "photo": "photos/tremont-st-at-e-berkeley-st.jpg"
  },
  {
    "id": 5,
    "name": "Northeastern University - North Parking Lot",
    "lat": 42.341814,
    "long": -71.090179
  },
  {
    "id": 6,
    "name": "Cambridge St at Joy St",
    "lat": 42.36121165307985,
    "long": -71.06530619789737
  },
  {
    "id": 7,
    "name": "Fan Pier",
    "lat": 42.3533905070523,
    "long": -71.04457139968872,
    "photo": "photos/fan-pier.jpg"
  },
  {
    "id": 8,
    "name": "Union Square - Brighton Ave at Cambridge St",
    "lat": 42.353334,
    "long": -71.137313,
    "photo": "photos/union-square-allston.jpg"
  },
  {
    "id": 9,
    "name": "Commonwealth Ave at Agganis Way",
    "lat": 42.35169201885973,
    "long": -71.11903488636017,
    "photo": "photos/commonwealth-at-amory-st.jpg"
  },
  {
    "id": 10,
    "name": "B.U. Central - 725 Comm. Ave.",
    "lat": 42.350406,
    "long": -71.108279,
    "photo": "photos/bu-central-725-comm-ave.jpg"
  },
  {
    "id": 11,
    "name": "Longwood Ave at Binney St",
    "lat": 42.338629,
    "long": -71.1065,
    "photo": "photos/longwood-ave-at-binney-st.jpg"
  },
  {
    "id": 12,
    "name": "Ruggles T Stop - Columbus Ave at Melnea Cass Blvd",
    "lat": 42.33624444796878,
    "long": -71.08798563480377,
    "photo": "photos/ruggles-t-stop.jpg"
  },
  {
    "id": 14,
    "name": "HMS/HSPH - Avenue Louis Pasteur at Longwood Ave",
    "lat": 42.3374174845973,
    "long": -71.10286116600037,
    "photo": "photos/avenue-louis-pasteur-at-longwood-ave.jpg"
  },
  {
    "id": 15,
    "name": "Brighton Mills - 370 Western Ave",
    "lat": 42.3615457081725,
    "long": -71.13776206970215
  },
  {
    "id": 16,
    "name": "Back Bay T Stop - Dartmouth St at Stuart St",
    "lat": 42.34807412317439,
    "long": -71.07657015323639,
    "photo": "photos/back-bay-t-stop.jpg"
  },
  {
    "id": 17,
    "name": "Soldiers Field Park - 111 Western Ave",
    "lat": 42.364263440638524,
    "long": -71.1182756971175
  },
  {
    "id": 19,
    "name": "Park Dr at Buswell St",
    "lat": 42.347241,
    "long": -71.105301
  },
  {
    "id": 20,
    "name": "Aquarium T Stop - 200 Atlantic Ave",
    "lat": 42.35991176110118,
    "long": -71.0514298081398,
    "photo": "photos/aquarium-t-stop.jpg"
  },
  {
    "id": 21,
    "name": "Prudential Center - Belvedere St",
    "lat": 42.34652003998412,
    "long": -71.08065776545118,
    "photo": "photos/prudential-center.jpg"
  },
  {
    "id": 22,
    "name": "South Station - 700 Atlantic Ave",
    "lat": 42.352175,
    "long": -71.055547,
    "photo": "photos/south-station.jpg"
  },
  {
    "id": 23,
    "name": "Boston City Hall - 28 State St",
    "lat": 42.35892,
    "long": -71.057629
  },
  {
    "id": 24,
    "name": "Seaport Square - Seaport Blvd at Northern Ave",
    "lat": 42.35148193460858,
    "long": -71.04436084628105,
    "photo": "photos/seaport-square.jpg"
  },
  {
    "id": 25,
    "name": "South End Library - Tremont St at W Newton St",
    "lat": 42.341332,
    "long": -71.076847,
    "photo": "photos/south-end-library.jpg"
  },
  {
    "id": 26,
    "name": "Washington St at Waltham St",
    "lat": 42.341522,
    "long": -71.068922,
    "photo": "photos/washington-st-at-waltham-st.jpg"
  },
  {
    "id": 27,
    "name": "Roxbury Crossing T Stop - Columbus Ave at Tremont St",
    "lat": 42.331184,
    "long": -71.095171,
    "photo": "photos/roxbury-crossing-t-stop.jpg"
  },
  {
    "id": 29,
    "name": "Innovation Lab - 125 Western Ave at Batten Way",
    "lat": 42.363732,
    "long": -71.124565
  },
  {
    "id": 30,
    "name": "Brigham Circle - Francis St at Huntington Ave",
    "lat": 42.33462893055976,
    "long": -71.10407917767589,
    "photo": "photos/brigham-circle.jpg"
  },
  {
    "id": 31,
    "name": "Seaport Hotel - Congress St at Seaport Ln",
    "lat": 42.34881026188269,
    "long": -71.04167744055303,
    "photo": "photos/seaport-hotel.jpg"
  },
  {
    "id": 32,
    "name": "Landmark Center - Brookline Ave at Park Dr",
    "lat": 42.34519428944095,
    "long": -71.1016970872879
  },
  {
    "id": 33,
    "name": "Kenmore Square",
    "lat": 42.348706,
    "long": -71.097009
  },
  {
    "id": 35,
    "name": "Arch St at Franklin St",
    "lat": 42.355335019412564,
    "long": -71.0582291708306
  },
  {
    "id": 36,
    "name": "Copley Square - Dartmouth St at Boylston St",
    "lat": 42.34992828230057,
    "long": -71.07739206866427,
    "photo": "photos/copley-square.jpg"
  },
  {
    "id": 37,
    "name": "New Balance - 20 Guest St",
    "lat": 42.35732921867706,
    "long": -71.14673539996147,
    "photo": "photos/new-balance.jpg"
  },
  {
    "id": 39,
    "name": "Washington St at Rutland St",
    "lat": 42.338514601785995,
    "long": -71.07404083013535,
    "photo": "photos/washington-st-at-rutland-st.jpg"
  },
  {
    "id": 40,
    "name": "Lewis Wharf at Atlantic Ave",
    "lat": 42.363871,
    "long": -71.050877,
    "photo": "photos/lewis-wharf-at-atlantic-ave.jpg"
  },
  {
    "id": 41,
    "name": "Packard's Corner - Commonwealth Ave at Brighton Ave",
    "lat": 42.352261,
    "long": -71.123831,
    "photo": "photos/packards-corner.jpg"
  },
  {
    "id": 42,
    "name": "Boylston St at Arlington St",
    "lat": 42.352054773220544,
    "long": -71.07048687257702,
    "photo": "photos/boylston-st-at-arlington-st.jpg"
  },
  {
    "id": 43,
    "name": "Rowes Wharf at Atlantic Ave",
    "lat": 42.357143,
    "long": -71.050699,
    "photo": "photos/rowes-wharf.jpg"
  },
  {
    "id": 44,
    "name": "Congress St at North St",
    "lat": 42.36041774637169,
    "long": -71.05752243543975
  },
  {
    "id": 45,
    "name": "Jersey St. at Boylston St.",
    "lat": 42.3446808403874,
    "long": -71.09785348176956,
    "photo": "photos/jersey-st-at-boylston-st.jpg"
  },
  {
    "id": 46,
    "name": "Christian Science Plaza - Massachusetts Ave at Westland Ave",
    "lat": 42.3436658245146,
    "long": -71.08582377433777,
    "photo": "photos/christian-science-plaza.jpg"
  },
  {
    "id": 47,
    "name": "Cross St at Hanover St",
    "lat": 42.362811,
    "long": -71.056067,
    "photo": "photos/cross-st-at-hanover-st.jpg"
  },
  {
    "id": 48,
    "name": "Post Office Square - Pearl St at Milk St",
    "lat": 42.35585435522005,
    "long": -71.05459745998814
  },
  {
    "id": 49,
    "name": "Stuart St at Charles St",
    "lat": 42.351146,
    "long": -71.066289,
    "photo": "photos/stuart-st-at-charles-st.jpg"
  },
  {
    "id": 50,
    "name": "Boylston St at Berkeley St",
    "lat": 42.3511419825475,
    "long": -71.07329249382019,
    "photo": "photos/boylston-st-at-berkeley-st.jpg"
  },
  {
    "id": 51,
    "name": "Washington St at Lenox St",
    "lat": 42.3350989929096,
    "long": -71.07903778553009,
    "photo": "photos/washington-st-at-lenox-st.jpg"
  },
  {
    "id": 52,
    "name": "Newbury St at Hereford St",
    "lat": 42.348717,
    "long": -71.085954,
    "photo": "photos/newbury-st-at-hereford-st.jpg"
  },
  {
    "id": 53,
    "name": "Beacon St at Massachusetts Ave",
    "lat": 42.35082680669095,
    "long": -71.0898108780384,
    "photo": "photos/beacon-st-at-mass-ave.jpg"
  },
  {
    "id": 54,
    "name": "Tremont St at West St",
    "lat": 42.354979,
    "long": -71.063348
  },
  {
    "id": 55,
    "name": "Boylston St at Massachusetts Ave",
    "lat": 42.347265,
    "long": -71.088088,
    "photo": "photos/boylston-st-at-massachusetts-ave.jpg"
  },
  {
    "id": 56,
    "name": "Dudley Square - Dudley St at Warren St",
    "lat": 42.32854046293402,
    "long": -71.08416482806204,
    "photo": "photos/dudley-square.jpg"
  },
  {
    "id": 57,
    "name": "Columbus Ave at Massachusetts Ave",
    "lat": 42.340542615516355,
    "long": -71.08138847914233,
    "photo": "photos/massachusetts-ave-at-columbus-ave.jpg"
  },
  {
    "id": 58,
    "name": "Mugar Way at Beacon St",
    "lat": 42.355536284897084,
    "long": -71.07286870479584,
    "photo": "photos/beacon-st-arlington-st.jpg"
  },
  {
    "id": 59,
    "name": "Chinatown Gate Plaza",
    "lat": 42.351356,
    "long": -71.059367,
    "photo": "photos/chinatown-gate-plaza.jpg"
  },
  {
    "id": 60,
    "name": "Charles Circle - Charles St at Cambridge St",
    "lat": 42.36018499796463,
    "long": -71.07086597688976,
    "photo": "photos/charles-circle-charles-st-at-cambridge-st.jpg"
  },
  {
    "id": 61,
    "name": "Boylston St at Fairfield St",
    "lat": 42.348762,
    "long": -71.082383,
    "photo": "photos/boylston-st-at-fairfield-st.jpg"
  },
  {
    "id": 63,
    "name": "Dorchester Ave at Gillette Park",
    "lat": 42.344040510016356,
    "long": -71.05737626552582,
    "photo": "photos/dorchester-ave-at-gillette-park.jpg"
  },
  {
    "id": 64,
    "name": "Congress St at Sleeper St",
    "lat": 42.351004495946704,
    "long": -71.04930013418198,
    "photo": "photos/congress-st-at-sleeper-st.jpg"
  },
  {
    "id": 65,
    "name": "Boston Convention and Exhibition Center - Summer St at West Side Dr",
    "lat": 42.347763454147454,
    "long": -71.0453599691391,
    "photo": "photos/boston-convention-and-exhibition-center.jpg"
  },
  {
    "id": 66,
    "name": "Allston Green District - Griggs St at Commonwealth Ave",
    "lat": 42.34922469338298,
    "long": -71.13275302578586,
    "photo": "photos/allston-green-district.jpg"
  },
  {
    "id": 67,
    "name": "MIT at Mass Ave / Amherst St",
    "lat": 42.3581,
    "long": -71.093198,
    "photo": "photos/mit-at-mass-ave-amherst-st.jpg"
  },
  {
    "id": 68,
    "name": "Central Square at Mass Ave / Essex St",
    "lat": 42.36507,
    "long": -71.1031,
    "photo": "photos/central-square-at-mass-ave-essex-st.jpg"
  },
  {
    "id": 69,
    "name": "Coolidge Corner - Beacon St at Centre St",
    "lat": 42.341598,
    "long": -71.123338,
    "photo": "photos/coolidge-corner.jpg"
  },
  {
    "id": 70,
    "name": "Harvard Kennedy School at Bennett St / Eliot St",
    "lat": 42.3722168027866,
    "long": -71.12188071012497,
    "photo": "photos/harvard-kennedy-school-at-bennett-st.jpg"
  },
  {
    "id": 71,
    "name": "Conway Park - Somerville Avenue",
    "lat": 42.383405,
    "long": -71.107593,
    "photo": "photos/conway-park-somerville-ave.jpg"
  },
  {
    "id": 72,
    "name": "One Broadway / Kendall Sq at Main St / 3rd St",
    "lat": 42.36224178650923,
    "long": -71.0831107199192,
    "photo": "photos/one-broadway-kendall-sq-at-main-st-third-st.jpg"
  },
  {
    "id": 73,
    "name": "Harvard Square at Brattle St / Eliot St",
    "lat": 42.373231,
    "long": -71.120886,
    "photo": "photos/harvard-square-at-brattle-st-eliot-st.jpg"
  },
  {
    "id": 74,
    "name": "Harvard Square at Mass Ave/ Dunster",
    "lat": 42.373268,
    "long": -71.118579,
    "photo": "photos/harvard-square-at-mass-ave-dunster.jpg"
  },
  {
    "id": 75,
    "name": "Lafayette Square at Mass Ave / Main St / Columbia St",
    "lat": 42.36346469304347,
    "long": -71.10057324171066,
    "photo": "photos/lafayette-square-at-mass-ave-main-st.jpg"
  },
  {
    "id": 76,
    "name": "Central Sq Post Office / Cambridge City Hall at Mass Ave / Pleasant St",
    "lat": 42.366426,
    "long": -71.105495,
    "photo": "photos/central-sq-po-cambridge-city-hall.jpg"
  },
  {
    "id": 77,
    "name": "Somerville City Hall",
    "lat": 42.386844,
    "long": -71.09812,
    "photo": "photos/somerville-city-hall.jpg"
  },
  {
    "id": 78,
    "name": "Union Square - Somerville",
    "lat": 42.37965809715277,
    "long": -71.09394280244487,
    "photo": "photos/union-square-somerville.jpg"
  },
  {
    "id": 79,
    "name": "Beacon St at Washington / Kirkland",
    "lat": 42.37842,
    "long": -71.105668,
    "photo": "photos/beacon-st-at-washington-st-kirkland-st.jpg"
  },
  {
    "id": 80,
    "name": "MIT Stata Center at Vassar St / Main St",
    "lat": 42.3621312344991,
    "long": -71.09115600585936,
    "photo": "photos/mit-stata-center-at-vassar-st-main-st.jpg"
  },
  {
    "id": 81,
    "name": "Chinatown T Stop",
    "lat": 42.352409,
    "long": -71.062679,
    "photo": "photos/boylston-st-at-washington-st.jpg"
  },
  {
    "id": 82,
    "name": "Beacon St at Tappan St",
    "lat": 42.33826680058037,
    "long": -71.13894682028331,
    "photo": "photos/washington-square.jpg"
  },
  {
    "id": 84,
    "name": "CambridgeSide Galleria - CambridgeSide PL at Land Blvd",
    "lat": 42.366981,
    "long": -71.076472,
    "photo": "photos/cambridgeside-galleria-cambridgeside-pl-at-land-blvd.jpg"
  },
  {
    "id": 85,
    "name": "Spaulding Rehabilitation Hospital - Charlestown Navy Yard",
    "lat": 42.378338,
    "long": -71.048927,
    "photo": "photos/spaulding-rehabilitation-hospital.jpg"
  },
  {
    "id": 86,
    "name": "Brookline Village - Pearl Street at MBTA",
    "lat": 42.3329989199507,
    "long": -71.11634425762531,
    "photo": "photos/brookline-village-pearl-st-at-mbta.jpg"
  },
  {
    "id": 87,
    "name": "Harvard University Housing - 115 Putnam Ave at Peabody Terrace",
    "lat": 42.366621,
    "long": -71.114214,
    "photo": "photos/harvard-university-housing-putnam-ave-at-peabody-terrace"
  },
  {
    "id": 88,
    "name": "Inman Square at Vellucci Plaza / Hampshire St",
    "lat": 42.374035,
    "long": -71.101427,
    "photo": "photos/inman-square-at-vellucci-plaza.jpg",
    "isLegacy": true
  },
  {
    "id": 89,
    "name": "Harvard Law School at Mass Ave / Jarvis St",
    "lat": 42.379011,
    "long": -71.119945,
    "photo": "photos/harvard-law-school-at-mass-ave-jarvis-st.jpg"
  },
  {
    "id": 90,
    "name": "Lechmere Station at Cambridge St / First St",
    "lat": 42.370677,
    "long": -71.076529,
    "photo": "photos/lechmere-station.jpg"
  },
  {
    "id": 91,
    "name": "One Kendall Square at Hampshire St / Portland St",
    "lat": 42.366277,
    "long": -71.09169
  },
  {
    "id": 92,
    "name": "University of Massachusetts Boston - Integrated Sciences Complex",
    "lat": 42.313917,
    "long": -71.04025
  },
  {
    "id": 93,
    "name": "JFK/UMass T Stop",
    "lat": 42.32033973515723,
    "long": -71.05118036270142
  },
  {
    "id": 94,
    "name": "Main St at Austin St",
    "lat": 42.375603,
    "long": -71.064608,
    "photo": "photos/main-st-at-austin-st.jpg"
  },
  {
    "id": 95,
    "name": "Cambridge St - at Columbia St / Webster Ave",
    "lat": 42.372969,
    "long": -71.094445,
    "photo": "photos/cambridge-st-at-columbia-st.jpg"
  },
  {
    "id": 96,
    "name": "Cambridge Main Library at Broadway / Trowbridge St",
    "lat": 42.373379,
    "long": -71.111075,
    "photo": "photos/cambridge-main-library-at-broadway-trowbridge-st.jpg"
  },
  {
    "id": 97,
    "name": "Harvard University River Houses at DeWolfe St / Cowperthwaite St",
    "lat": 42.36919031768079,
    "long": -71.11714124679565,
    "photo": "photos/harvard-river-houses-at-dewolfe-st.jpg"
  },
  {
    "id": 98,
    "name": "Warren St at Chelsea St",
    "lat": 42.371848,
    "long": -71.060292,
    "photo": "photos/warren-st-at-chelsea-st.jpg"
  },
  {
    "id": 99,
    "name": "Wilson Square",
    "lat": 42.385582,
    "long": -71.113341
  },
  {
    "id": 100,
    "name": "Davis Square",
    "lat": 42.396969,
    "long": -71.123024,
    "photo": "photos/davis-square.jpg"
  },
  {
    "id": 102,
    "name": "Powder House Circle - Nathan Tufts Park",
    "lat": 42.400877,
    "long": -71.116772,
    "photo": "photos/powder-house-circle.jpg"
  },
  {
    "id": 103,
    "name": "JFK Crossing at Harvard St. / Thorndike St.",
    "lat": 42.346563,
    "long": -71.128374,
    "photo": "photos/jfk-crossing-at-harvard-st-thorndike-st.jpg"
  },
  {
    "id": 104,
    "name": "Harvard University Radcliffe Quadrangle at Shepard St / Garden St",
    "lat": 42.380287,
    "long": -71.125107,
    "photo": "photos/harvard-radcliffe-quadrangle-shepard-st-garden-st.jpg"
  },
  {
    "id": 105,
    "name": "Lower Cambridgeport at Magazine St / Riverside Rd",
    "lat": 42.357218503176526,
    "long": -71.1138716340065
  },
  {
    "id": 106,
    "name": "Dudley Town Common - Mt Pleasant Ave at Blue Hill Ave",
    "lat": 42.325333,
    "long": -71.075354
  },
  {
    "id": 107,
    "name": "Ames St at Main St",
    "lat": 42.3625,
    "long": -71.08822,
    "photo": "photos/main-st-at-ames-st.jpg"
  },
  {
    "id": 108,
    "name": "Harvard University / SEAS Cruft-Pierce Halls at 29 Oxford St",
    "lat": 42.377945,
    "long": -71.116865,
    "photo": "photos/harvard-university-seas-cruft-pierce-halls.jpg"
  },
  {
    "id": 109,
    "name": "West End Park",
    "lat": 42.36590788445084,
    "long": -71.06446668505669
  },
  {
    "id": 110,
    "name": "Harvard University Gund Hall at Quincy St / Kirkland S",
    "lat": 42.376369,
    "long": -71.114025,
    "photo": "photos/harvard-university-gund-hall-quincy-kirkland.jpg"
  },
  {
    "id": 111,
    "name": "Packard Ave at Powderhouse Blvd",
    "lat": 42.40449,
    "long": -71.123413,
    "photo": "photos/packard-ave-at-powderhouse-blvd.jpg"
  },
  {
    "id": 112,
    "name": "Clarendon Hill at Broadway",
    "lat": 42.406302,
    "long": -71.132446,
    "photo": "photos/clarendon-hill-at-broadway.jpg"
  },
  {
    "id": 113,
    "name": "Andrew T Stop - Dorchester Ave at Dexter St",
    "lat": 42.330473650415165,
    "long": -71.05701684951782
  },
  {
    "id": 114,
    "name": "Teele Square",
    "lat": 42.40203828065014,
    "long": -71.1265329148955
  },
  {
    "id": 115,
    "name": "Porter Square Station",
    "lat": 42.387995,
    "long": -71.119084,
    "photo": "photos/porter-square-station.jpg"
  },
  {
    "id": 116,
    "name": "359 Broadway - Broadway at Fayette Street",
    "lat": 42.370803,
    "long": -71.104412,
    "photo": "photos/359-broadway-at-fayette-st.jpg"
  },
  {
    "id": 117,
    "name": "Binney St / Sixth St",
    "lat": 42.36608797388682,
    "long": -71.08633603909765
  },
  {
    "id": 118,
    "name": "Linear Park - Mass. Ave. at Cameron Ave. ",
    "lat": 42.397828,
    "long": -71.130516,
    "photo": "photos/linear-park-mass-ave-at-cameron-ave.jpg"
  },
  {
    "id": 119,
    "name": "South Boston Library - 646 E Broadway",
    "lat": 42.335741,
    "long": -71.03877,
    "photo": "photos/south-boston-library.jpg"
  },
  {
    "id": 120,
    "name": "Beacon St at Charles St",
    "lat": 42.356052,
    "long": -71.069849,
    "photo": "photos/charles-st-at-beacon-st.jpg"
  },
  {
    "id": 121,
    "name": "W Broadway at Dorchester St",
    "lat": 42.335693,
    "long": -71.045859,
    "photo": "photos/w-broadway-at-dorchester-st.jpg"
  },
  {
    "id": 122,
    "name": "Burlington Ave at Brookline Ave",
    "lat": 42.345733,
    "long": -71.100694
  },
  {
    "id": 124,
    "name": "Curtis Hall - South St at Centre St",
    "lat": 42.309054,
    "long": -71.11543,
    "photo": "photos/curtis-hall.jpg"
  },
  {
    "id": 125,
    "name": "Hyde Square - Barbara St at Centre St",
    "lat": 42.32176525723952,
    "long": -71.10984160567114,
    "photo": "photos/hyde-square.jpg"
  },
  {
    "id": 126,
    "name": "Egleston Square - Atherton St at Washington St",
    "lat": 42.315692,
    "long": -71.098634,
    "photo": "photos/egleston-square.jpg"
  },
  {
    "id": 128,
    "name": "E Cottage St at Columbia Rd",
    "lat": 42.320561,
    "long": -71.06198
  },
  {
    "id": 129,
    "name": "Hayes Square - Vine St at Moulton St",
    "lat": 42.377022,
    "long": -71.056605,
    "photo": "photos/hayes-square-at-vine-st.jpg"
  },
  {
    "id": 130,
    "name": "Upham's Corner",
    "lat": 42.31727474327453,
    "long": -71.06537003967787
  },
  {
    "id": 131,
    "name": "Jackson Square T Stop",
    "lat": 42.32293117195949,
    "long": -71.10014140605927,
    "photo": "photos/jackson-square-t-stop.jpg"
  },
  {
    "id": 133,
    "name": "Green Street T Stop - Green St at Amory St",
    "lat": 42.310579,
    "long": -71.107341,
    "photo": "photos/green-street-t-stop.jpg"
  },
  {
    "id": 134,
    "name": "Boylston St at Dartmouth St",
    "lat": 42.350413,
    "long": -71.07655,
    "photo": "photos/boylston-st-at-dartmouth-st.jpg"
  },
  {
    "id": 135,
    "name": "ID Building East",
    "lat": 42.344827,
    "long": -71.028664,
    "photo": "photos/id-building-east.jpg"
  },
  {
    "id": 136,
    "name": "ID Building West",
    "lat": 42.344796,
    "long": -71.031614,
    "photo": "photos/id-building-west.jpg"
  },
  {
    "id": 137,
    "name": "Magoun Square at Trum Field",
    "lat": 42.398365,
    "long": -71.107818,
    "photo": "photos/magoun-square-at-trum-field.jpg"
  },
  {
    "id": 138,
    "name": "Newmarket Square T Stop - Massachusetts Ave at Newmarket Square",
    "lat": 42.326599,
    "long": -71.066498
  },
  {
    "id": 139,
    "name": "Dana Park",
    "lat": 42.361780439606044,
    "long": -71.10809952020645
  },
  {
    "id": 140,
    "name": "Danehy Park",
    "lat": 42.388966,
    "long": -71.132788,
    "photo": "photos/danehy-park.jpg"
  },
  {
    "id": 141,
    "name": "Kendall Street",
    "lat": 42.363560158429884,
    "long": -71.08216792345047
  },
  {
    "id": 142,
    "name": "Alewife Station at Russell Field",
    "lat": 42.396105,
    "long": -71.139459,
    "photo": "photos/alewife-station-at-russell-field.jpg"
  },
  {
    "id": 143,
    "name": "EF - North Point Park",
    "lat": 42.369885,
    "long": -71.069957,
    "photo": "photos/ef-north-point-park.jpg"
  },
  {
    "id": 144,
    "name": "Rogers St & Land Blvd",
    "lat": 42.36575798214837,
    "long": -71.07699394226073
  },
  {
    "id": 145,
    "name": "Rindge Avenue - O'Neill Library",
    "lat": 42.392766,
    "long": -71.129042,
    "photo": "photos/rindge-avenue-oneill-library.jpg"
  },
  {
    "id": 146,
    "name": "Murphy Skating Rink - 1880 Day Blvd",
    "lat": 42.336448,
    "long": -71.023739,
    "photo": "photos/day-boulevard.jpg"
  },
  {
    "id": 149,
    "name": "175 N Harvard St",
    "lat": 42.363796,
    "long": -71.129164
  },
  {
    "id": 150,
    "name": "State Street at Channel Center",
    "lat": 42.344137,
    "long": -71.052608,
    "photo": "photos/state-street-at-channel-center.jpg"
  },
  {
    "id": 151,
    "name": "Surface Rd at India St",
    "lat": 42.358155,
    "long": -71.052163,
    "photo": "photos/surface-rd-at-india-st.jpg"
  },
  {
    "id": 152,
    "name": "Ink Block - Harrison Ave at Herald St",
    "lat": 42.345901,
    "long": -71.063187,
    "photo": "photos/ink-block.jpg"
  },
  {
    "id": 156,
    "name": "Somerville Hospital",
    "lat": 42.39088801721338,
    "long": -71.10962569713591,
    "photo": "photos/somerville-hospital.jpg"
  },
  {
    "id": 157,
    "name": "Seaport Blvd at Sleeper St",
    "lat": 42.35317809186252,
    "long": -71.04817356923377,
    "photo": "photos/seaport-blvd-at-sleeper-st.jpg"
  },
  {
    "id": 159,
    "name": "S Huntington Ave at Heath St",
    "lat": 42.32760387040573,
    "long": -71.11089169979095,
    "photo": "photos/s-huntington-ave-at-heath-st.jpg"
  },
  {
    "id": 160,
    "name": "Wentworth Institute of Technology - Huntington Ave at Vancouver St",
    "lat": 42.33758601097239,
    "long": -71.09627097845076,
    "photo": "photos/wentworth-institute-of-technology.jpg"
  },
  {
    "id": 161,
    "name": "W Broadway at D St",
    "lat": 42.3391085,
    "long": -71.0514432,
    "photo": "photos/w-broadway-at-d-st.jpg"
  },
  {
    "id": 162,
    "name": "Franklin Park - Seaver St at Humbolt Ave",
    "lat": 42.309796,
    "long": -71.092225
  },
  {
    "id": 163,
    "name": "The Lawn on D",
    "lat": 42.344792,
    "long": -71.044024,
    "photo": "photos/lawn-on-d.jpg"
  },
  {
    "id": 167,
    "name": "Ryan Playground - Dorchester Ave at Harbor View St",
    "lat": 42.317642,
    "long": -71.056664
  },
  {
    "id": 169,
    "name": "Edwards Playground - Main St at Eden St",
    "lat": 42.378965,
    "long": -71.068607,
    "photo": "photos/main-st-at-eden-st.jpg"
  },
  {
    "id": 170,
    "name": "Franklin Park Zoo - Franklin Park Rd at Blue Hill Ave",
    "lat": 42.303469,
    "long": -71.085347
  },
  {
    "id": 171,
    "name": "Bunker Hill Community College",
    "lat": 42.37408991426522,
    "long": -71.06905996799469,
    "photo": "photos/bunker-hill-community-college.jpg"
  },
  {
    "id": 173,
    "name": "Savin Hill T Stop - S Sydney St at Bay St",
    "lat": 42.3106,
    "long": -71.0539
  },
  {
    "id": 174,
    "name": "Washington St at Brock St",
    "lat": 42.3489528466951,
    "long": -71.16031676530838,
    "photo": "photos/washington-st-at-brock-st.jpg"
  },
  {
    "id": 175,
    "name": "Brighton Center - Washington St at Cambridge St",
    "lat": 42.34894857235593,
    "long": -71.15027189254761,
    "photo": "photos/brighton-center.jpg"
  },
  {
    "id": 176,
    "name": "Lesley University",
    "lat": 42.38674802045056,
    "long": -71.11901879310608,
    "photo": "photos/lesley-university.jpg"
  },
  {
    "id": 177,
    "name": "University Park",
    "lat": 42.36264779118595,
    "long": -71.10006093978882,
    "photo": "photos/university-park.jpg"
  },
  {
    "id": 178,
    "name": "MIT Pacific St at Purrington St",
    "lat": 42.35957320109044,
    "long": -71.10129475593567
  },
  {
    "id": 179,
    "name": "MIT Vassar St",
    "lat": 42.355601213279265,
    "long": -71.10394477844238,
    "photo": "photos/mit-at-vassar-st.jpg"
  },
  {
    "id": 180,
    "name": "Mt Auburn",
    "lat": 42.37478628706384,
    "long": -71.13320231437683
  },
  {
    "id": 181,
    "name": "Huron Ave At Vassal Lane",
    "lat": 42.381650612901176,
    "long": -71.13426981498378,
    "photo": "photos/huron-ave-at-vassal-lane.jpg"
  },
  {
    "id": 182,
    "name": "Museum of Science",
    "lat": 42.36769018024484,
    "long": -71.07116281986237
  },
  {
    "id": 183,
    "name": "Alewife MBTA at Steel Place",
    "lat": 42.395588457167094,
    "long": -71.14260613918304,
    "photo": "photos/alewife-mbta-at-steel-place.jpg"
  },
  {
    "id": 184,
    "name": "Sidney Research Campus/ Erie Street at Waverly",
    "lat": 42.35775309465199,
    "long": -71.10393404960632,
    "photo": "photos/sidney-research-campus.jpg"
  },
  {
    "id": 185,
    "name": "Third at Binney",
    "lat": 42.36544486137399,
    "long": -71.08277142047882,
    "photo": "photos/third-at-binney-st.jpg"
  },
  {
    "id": 186,
    "name": "Congress St at Northern Ave",
    "lat": 42.3481,
    "long": -71.03764,
    "photo": "photos/congress-st-at-northern-ave.jpg"
  },
  {
    "id": 187,
    "name": "Cypress St at Clark Playground",
    "lat": 42.32784317478686,
    "long": -71.1253622174263
  },
  {
    "id": 188,
    "name": "Foss Park",
    "lat": 42.39108438146733,
    "long": -71.09039425849915,
    "photo": "photos/foss-park.jpg"
  },
  {
    "id": 189,
    "name": "Kendall T",
    "lat": 42.362427842912396,
    "long": -71.08495473861694
  },
  {
    "id": 190,
    "name": "Nashua Street at Red Auerbach Way",
    "lat": 42.365673,
    "long": -71.064263
  },
  {
    "id": 191,
    "name": "Tappan St at Brookline Hills MBTA",
    "lat": 42.332096063019364,
    "long": -71.128458827734
  },
  {
    "id": 192,
    "name": "Purchase St at Pearl St",
    "lat": 42.354659,
    "long": -71.053181,
    "photo": "photos/purchase-st-at-pearl-st.jpg"
  },
  {
    "id": 193,
    "name": "Brookline Town Hall",
    "lat": 42.33376472623494,
    "long": -71.12046446660315
  },
  {
    "id": 194,
    "name": "Broadway St at Mt Pleasant St",
    "lat": 42.386141411639564,
    "long": -71.07828140258789,
    "photo": "photos/broadway-st-at-mt-pleasant-st.jpg"
  },
  {
    "id": 195,
    "name": "Child St at North St",
    "lat": 42.37150494100319,
    "long": -71.07249312120985,
    "photo": "photos/brian-p-murphy-staircase-at-child-st.jpg"
  },
  {
    "id": 196,
    "name": "Roxbury YMCA - Warren St at MLK Blvd",
    "lat": 42.31787329345602,
    "long": -71.08243077993393,
    "photo": "photos/roxbury-ymca.jpg"
  },
  {
    "id": 197,
    "name": "MLK Blvd at Washington St",
    "lat": 42.32143814183195,
    "long": -71.09126061201096
  },
  {
    "id": 199,
    "name": "Upham's Corner T Stop - Magnolia St at Dudley St",
    "lat": 42.318697341722434,
    "long": -71.0697814822197
  },
  {
    "id": 200,
    "name": "Washington St at Melnea Cass Blvd",
    "lat": 42.332817,
    "long": -71.081198,
    "photo": "photos/washington-st-at-melnea-cass-blvd.jpg"
  },
  {
    "id": 201,
    "name": "NCAAA - Walnut Ave at Crawford St",
    "lat": 42.316902,
    "long": -71.091946
  },
  {
    "id": 202,
    "name": "Grove Hall Library - 41 Geneva Ave",
    "lat": 42.30791,
    "long": -71.080952,
    "photo": "photos/grove-hall-library.jpg"
  },
  {
    "id": 203,
    "name": "Columbia Rd at Ceylon St",
    "lat": 42.309572,
    "long": -71.0729
  },
  {
    "id": 204,
    "name": "Walnut Ave at Warren St",
    "lat": 42.324081,
    "long": -71.083235,
    "photo": "photos/walnut-ave-at-warren-st.jpg"
  },
  {
    "id": 205,
    "name": "Bowdoin St at Quincy St",
    "lat": 42.30785224238503,
    "long": -71.06512248516083
  },
  {
    "id": 206,
    "name": "Government Center - Cambridge St at Court St",
    "lat": 42.359802515995526,
    "long": -71.05960782626425
  },
  {
    "id": 207,
    "name": "Faneuil St at Market St",
    "lat": 42.35484,
    "long": -71.150226
  },
  {
    "id": 208,
    "name": "Oak Square - 615 Washington St",
    "lat": 42.35057,
    "long": -71.166491,
    "photo": "photos/oak-square.jpg"
  },
  {
    "id": 209,
    "name": "Chelsea St at Saratoga St",
    "lat": 42.379772,
    "long": -71.027448,
    "photo": "photos/chelsea-st-at-saratoga-st.jpg"
  },
  {
    "id": 210,
    "name": "Bennington St at Byron St",
    "lat": 42.383532520117896,
    "long": -71.01619094610214,
    "photo": "photos/bennington-st-at-byron-st.jpg"
  },
  {
    "id": 211,
    "name": "Piers Park",
    "lat": 42.3648929326648,
    "long": -71.03497177362442,
    "photo": "photos/piers-park.jpg"
  },
  {
    "id": 212,
    "name": "Maverick Square - Lewis Mall",
    "lat": 42.368844082898356,
    "long": -71.03977829217911,
    "photo": "photos/maverick-square-lewis-mall.jpg"
  },
  {
    "id": 213,
    "name": "East Boston Neighborhood Health Center - 20 Maverick Square",
    "lat": 42.369536,
    "long": -71.039431,
    "photo": "photos/ebnhc-maverick-square.jpg"
  },
  {
    "id": 214,
    "name": "Airport T Stop - Bremen St at Brooks St",
    "lat": 42.37533522545788,
    "long": -71.03131584841321,
    "photo": "photos/airport-t-stop.jpg"
  },
  {
    "id": 215,
    "name": "The Eddy - New St at Sumner St",
    "lat": 42.370744,
    "long": -71.044201,
    "photo": "photos/the-eddy-new-st-at-sumner-st.jpg"
  },
  {
    "id": 216,
    "name": "Glendon St at Condor St",
    "lat": 42.38240377674137,
    "long": -71.03024303913116,
    "photo": "photos/glendon-st-at-condor-st.jpg"
  },
  {
    "id": 217,
    "name": "Orient Heights T Stop - Bennington St at Saratoga St",
    "lat": 42.386781,
    "long": -71.006098,
    "photo": "photos/orient-heights-t-stop.jpg"
  },
  {
    "id": 218,
    "name": "Watermark Seaport - Boston Wharf Rd at Seaport Blvd",
    "lat": 42.351586001198456,
    "long": -71.04569256305693,
    "photo": "photos/watermark-seaport.jpg"
  },
  {
    "id": 219,
    "name": "Boston East - 126 Border St",
    "lat": 42.373312125824704,
    "long": -71.0410200806291,
    "photo": "photos/boston-east.jpg"
  },
  {
    "id": 221,
    "name": "Verizon Innovation Hub 10 Ware Street",
    "lat": 42.37250864997261,
    "long": -71.11305356025696,
    "photo": "photos/verizon-innovation-hub-10-ware-st.jpg"
  },
  {
    "id": 222,
    "name": "Troy Boston",
    "lat": 42.343749,
    "long": -71.062256,
    "photo": "photos/troy-boston.jpg"
  },
  {
    "id": 224,
    "name": "Fresh Pond Reservation",
    "lat": 42.38267827521855,
    "long": -71.143478951426,
    "photo": "photos/fresh-pond-reservation.jpg"
  },
  {
    "id": 225,
    "name": "Cambridge Dept. of Public Works -147 Hampshire St.",
    "lat": 42.37119727759414,
    "long": -71.09759867191315,
    "photo": "photos/cambridge-department-of-public-works.jpg"
  },
  {
    "id": 226,
    "name": "Commonwealth Ave At Babcock St",
    "lat": 42.35154734791375,
    "long": -71.12126246094704,
    "photo": "photos/commonwealth-ave-at-babcock-st.jpg"
  },
  {
    "id": 227,
    "name": "Silber Way",
    "lat": 42.34949599514002,
    "long": -71.10057592391968,
    "photo": "photos/silber-way.jpg"
  },
  {
    "id": 228,
    "name": "One Memorial Drive",
    "lat": 42.361619320766856,
    "long": -71.0804355052096
  },
  {
    "id": 232,
    "name": "Four Corners - 157 Washington St",
    "lat": 42.304127927390155,
    "long": -71.07929527759552,
    "photo": "photos/four-corners.jpg"
  },
  {
    "id": 233,
    "name": "St Mary's",
    "lat": 42.346197076555455,
    "long": -71.10728681087494
  },
  {
    "id": 234,
    "name": "Broadway at Central St",
    "lat": 42.39517150121575,
    "long": -71.09850591982195,
    "photo": "photos/broadway-at-central-st.jpg"
  },
  {
    "id": 235,
    "name": "East Somerville Library (Broadway and Illinois)",
    "lat": 42.3876281075134,
    "long": -71.08318716287613,
    "photo": "photos/east-somerville-library.jpg"
  },
  {
    "id": 236,
    "name": "Assembly Square T",
    "lat": 42.392232840046276,
    "long": -71.07746601104736,
    "photo": "photos/assembly-square-t-stop.jpg"
  },
  {
    "id": 239,
    "name": "Community Path at Cedar Street",
    "lat": 42.39407223665884,
    "long": -71.11133694648743,
    "photo": "photos/community-path-at-cedar-st.jpg"
  },
  {
    "id": 255,
    "name": "Park St at Norwell St",
    "lat": 42.2944167,
    "long": -71.0783056
  },
  {
    "id": 258,
    "name": "Gallivan Blvd at Adams St",
    "lat": 42.28297567840305,
    "long": -71.05466698296368
  },
  {
    "id": 259,
    "name": "Washington St at Bradlee St",
    "lat": 42.299164979365884,
    "long": -71.07345871645519,
    "photo": "photos/washington-st-at-bradlee-st.jpg"
  },
  {
    "id": 260,
    "name": "Fields Corner T Stop",
    "lat": 42.2996667,
    "long": -71.0605833
  },
  {
    "id": 268,
    "name": "Centre St at Knoll St",
    "lat": 42.2938,
    "long": -71.136941
  },
  {
    "id": 271,
    "name": "Ashmont T Stop",
    "lat": 42.2856944,
    "long": -71.0641389
  },
  {
    "id": 272,
    "name": "Shawmut T Stop",
    "lat": 42.292917,
    "long": -71.06575
  },
  {
    "id": 273,
    "name": "Forest Hills",
    "lat": 42.300923,
    "long": -71.114249
  },
  {
    "id": 279,
    "name": "Williams St at Washington St",
    "lat": 42.306539,
    "long": -71.107669,
    "photo": "photos/williams-st-at-washington-st.jpg"
  },
  {
    "id": 280,
    "name": "Main St at Baldwin St",
    "lat": 42.380857,
    "long": -71.070629
  },
  {
    "id": 282,
    "name": "Stony Brook T Stop",
    "lat": 42.316966,
    "long": -71.104374,
    "photo": "photos/stony-brook-t-stop.jpg"
  },
  {
    "id": 296,
    "name": "Farragut Rd at E. 6th St",
    "lat": 42.3334,
    "long": -71.02495
  },
  {
    "id": 318,
    "name": "Ames St at Broadway",
    "lat": 42.3636929,
    "long": -71.0875672
  },
  {
    "id": 319,
    "name": "84 Cambridgepark Dr",
    "lat": 42.3936,
    "long": -71.143941
  },
  {
    "id": 327,
    "name": "Main St at Thompson Sq",
    "lat": 42.374878467440965,
    "long": -71.06383498767171
  },
  {
    "id": 328,
    "name": "Grove St at Community Path",
    "lat": 42.396386809455,
    "long": -71.12011306006025,
    "photo": "photos/grove-st-at-community-path.jpg"
  },
  {
    "id": 329,
    "name": "Washington St at Myrtle St",
    "lat": 42.381699831636816,
    "long": -71.08377588917392,
    "photo": "photos/washington-st-at-myrtle-st.jpg"
  },
  {
    "id": 330,
    "name": "30 Dane St",
    "lat": 42.38100143038052,
    "long": -71.10402522613185,
    "photo": "photos/30-dane-st.jpg"
  },
  {
    "id": 331,
    "name": "Huntington Ave at Mass Art",
    "lat": 42.336585554561154,
    "long": -71.0988699646623
  },
  {
    "id": 332,
    "name": "Harvard Ave at Brainerd Rd",
    "lat": 42.34953016890375,
    "long": -71.13022770741735,
    "photo": "photos/harvard-ave-at-brainerd-rd.jpg"
  },
  {
    "id": 333,
    "name": "699 Mt Auburn St",
    "lat": 42.37500235137831,
    "long": -71.14871613699506
  },
  {
    "id": 334,
    "name": "Mass Ave at Hadley/Walden",
    "lat": 42.39120971915856,
    "long": -71.12260755160605
  },
  {
    "id": 335,
    "name": "Harvard St at Greene-Rose Heritage Park",
    "lat": 42.36599432867437,
    "long": -71.09522221614498
  },
  {
    "id": 336,
    "name": "Mattapan T Stop",
    "lat": 42.267902,
    "long": -71.093641
  },
  {
    "id": 337,
    "name": "Roslindale Village - South St",
    "lat": 42.287072,
    "long": -71.127754
  },
  {
    "id": 338,
    "name": "Commonwealth Ave at Kelton St",
    "lat": 42.348358628170445,
    "long": -71.13997217276847,
    "photo": "photos/commonwealth-ave-at-kelton-st.jpg"
  },
  {
    "id": 339,
    "name": "Archdale Rd at Washington St",
    "lat": 42.29266592872725,
    "long": -71.12119538714069
  },
  {
    "id": 340,
    "name": "Blue Hill Ave at Almont St",
    "lat": 42.274620671812244,
    "long": -71.09372552493369,
    "photo": "photos/blue-hill-ave-at-almont-st.jpg"
  },
  {
    "id": 341,
    "name": "Roslindale Village - Washington St",
    "lat": 42.28630716010807,
    "long": -71.12820532182013
  },
  {
    "id": 342,
    "name": "Boylston St at Jersey St",
    "lat": 42.344650628878306,
    "long": -71.09732501226972
  },
  {
    "id": 343,
    "name": "Morton St T",
    "lat": 42.280725142920296,
    "long": -71.08617242434775,
    "photo": "photos/morton-st-t-stop.jpg"
  },
  {
    "id": 344,
    "name": "Commonwealth Ave at Chiswick Rd",
    "lat": 42.34024644768889,
    "long": -71.15168806174552,
    "photo": "photos/commonwealth-ave-at-chiswick-rd.jpg"
  },
  {
    "id": 345,
    "name": "Park Plaza at Charles St S.",
    "lat": 42.351828068920675,
    "long": -71.06781138111728
  },
  {
    "id": 346,
    "name": "Cleveland Circle",
    "lat": 42.335543083570826,
    "long": -71.15061519672052,
    "photo": "photos/cleveland-circle.jpg"
  },
  {
    "id": 347,
    "name": "Thetford Ave at Norfolk St",
    "lat": 42.286212948246096,
    "long": -71.07942931372236,
    "photo": "photos/thetford-ave-at-norfolk-st.jpg"
  },
  {
    "id": 348,
    "name": "Talbot Ave At Blue Hill Ave",
    "lat": 42.2945833,
    "long": -71.087111,
    "photo": "photos/talbot-ave-at-blue-hill-ave.jpg"
  },
  {
    "id": 349,
    "name": "Washington St at Talbot Ave",
    "lat": 42.290333,
    "long": -71.071806,
    "photo": "photos/washington-st-at-talbot-ave.jpg"
  },
  {
    "id": 350,
    "name": "Codman Square Library",
    "lat": 42.2873611,
    "long": -71.071111,
    "photo": "photos/codman-square-library.jpg"
  },
  {
    "id": 351,
    "name": "Faneuil St at Arlington St",
    "lat": 42.35276620545606,
    "long": -71.15988485533308,
    "photo": "photos/faneuil-st-at-arlington-st.jpg"
  },
  {
    "id": 352,
    "name": "Ring Rd",
    "lat": 42.348278385426255,
    "long": -71.08044855314802
  },
  {
    "id": 353,
    "name": "Mattapan Library",
    "lat": 42.2773889,
    "long": -71.09325,
    "photo": "photos/mattapan-library.jpg"
  },
  {
    "id": 354,
    "name": "Washington St at Egremont Rd",
    "lat": 42.34286835071959,
    "long": -71.14127840855872,
    "photo": "photos/washington-st-at-egremont-rd.jpg"
  },
  {
    "id": 355,
    "name": "Bennington St at Constitution Beach",
    "lat": 42.385223935870535,
    "long": -71.01063068965232,
    "photo": "photos/bennington-st-at-constitution-beach.jpg"
  },
  {
    "id": 356,
    "name": "Charlestown Navy Yard",
    "lat": 42.374124549426526,
    "long": -71.05481199938367
  },
  {
    "id": 357,
    "name": "Centre St at Seaverns Ave",
    "lat": 42.3121203,
    "long": -71.1142981,
    "photo": "photos/centre-st-at-seaverns-ave.jpg"
  },
  {
    "id": 358,
    "name": "Medford St at Charlestown BCYF",
    "lat": 42.380429474494896,
    "long": -71.06055721676967
  },
  {
    "id": 359,
    "name": "One Brigham Circle",
    "lat": 42.333922701369964,
    "long": -71.10446508982932
  },
  {
    "id": 360,
    "name": "Bartlett St at John Elliot Sq",
    "lat": 42.3294633,
    "long": -71.0901582
  },
  {
    "id": 361,
    "name": "Deerfield St at Commonwealth Ave",
    "lat": 42.34924376955301,
    "long": -71.09728209692548
  },
  {
    "id": 362,
    "name": "Columbia Rd at Tierney Community Center",
    "lat": 42.33023070528729,
    "long": -71.05060093123029
  },
  {
    "id": 363,
    "name": "Harrison Ave at Mullins Way",
    "lat": 42.34521562115022,
    "long": -71.0638403149278,
    "photo": "photos/harrison-ave-at-mullins-way.jpg"
  },
  {
    "id": 364,
    "name": "Tremont St at Northampton St",
    "lat": 42.33889559644165,
    "long": -71.08149975611013
  },
  {
    "id": 365,
    "name": "Harrison Ave at Bennet St",
    "lat": 42.34942609892521,
    "long": -71.06209959843909,
    "photo": "photos/harrison-ave-at-bennet-st.jpg"
  },
  {
    "id": 366,
    "name": "Broadway T Stop",
    "lat": 42.34278116224413,
    "long": -71.05747275072645,
    "photo": "photos/broadway-t-stop.jpg"
  },
  {
    "id": 367,
    "name": "Vassal Lane at Tobin/VLUS",
    "lat": 42.3839322489048,
    "long": -71.13961271959852
  },
  {
    "id": 368,
    "name": "Blue Hill Ave at Southwood St",
    "lat": 42.317860205899876,
    "long": -71.07798628527235
  },
  {
    "id": 369,
    "name": "Boston Public Market",
    "lat": 42.36254854409333,
    "long": -71.0573735833168
  },
  {
    "id": 370,
    "name": "Dartmouth St at Newbury St",
    "lat": 42.35096144421219,
    "long": -71.07782810926437
  },
  {
    "id": 371,
    "name": "700 Huron Ave",
    "lat": 42.380788172914286,
    "long": -71.15412890911102
  },
  {
    "id": 372,
    "name": "Boylston St at Exeter St",
    "lat": 42.349589423682445,
    "long": -71.0794677917329
  },
  {
    "id": 373,
    "name": "Belgrade Ave at Walworth St",
    "lat": 42.28634589486312,
    "long": -71.13672129828046
  },
  {
    "id": 374,
    "name": "Tremont St at Hamilton Pl",
    "lat": 42.35668334969929,
    "long": -71.06166645884514
  },
  {
    "id": 376,
    "name": "Honan Library",
    "lat": 42.36027370454934,
    "long": -71.12852452327388
  },
  {
    "id": 377,
    "name": "Perry Park",
    "lat": 42.37927324600841,
    "long": -71.10341902831351,
    "photo": "photos/perry-park.jpg"
  },
  {
    "id": 378,
    "name": "191 Beacon St",
    "lat": 42.38032335045416,
    "long": -71.10878612855231,
    "photo": "photos/191-beacon-st.jpg"
  },
  {
    "id": 379,
    "name": "Tremont St at W. Dedham St",
    "lat": 42.34254913737952,
    "long": -71.07421449387857
  },
  {
    "id": 380,
    "name": "Mass Ave at Albany St",
    "lat": 42.36135837662249,
    "long": -71.09670273977825
  },
  {
    "id": 381,
    "name": "Inman Square at Springfield St.",
    "lat": 42.37438408515815,
    "long": -71.1001574621514
  },
  {
    "id": 384,
    "name": "Clarendon St at Newbury St",
    "lat": 42.35155308466532,
    "long": -71.0756903143556
  },
  {
    "id": 385,
    "name": "Albany St at E. Brookline St",
    "lat": 42.33664795427071,
    "long": -71.0689445958451
  },
  {
    "id": 386,
    "name": "Sennott Park  Broadway at Norfolk Street",
    "lat": 42.36860524248197,
    "long": -71.09930185605663
  },
  {
    "id": 387,
    "name": "Norman St at Kelvin St",
    "lat": 42.40581171700586,
    "long": -71.06708850720679,
    "photo": "photos/norman-st-at-kelvin-st.jpg"
  },
  {
    "id": 388,
    "name": "Main Street at Carter Street",
    "lat": 42.40413,
    "long": -71.0613,
    "photo": "photos/main-st-at-carter-st.jpg"
  },
  {
    "id": 389,
    "name": "Everett Square (Broadway at Chelsea St)",
    "lat": 42.40725945172653,
    "long": -71.05546381333625,
    "photo": "photos/everett-square.jpg"
  },
  {
    "id": 390,
    "name": "Broadway at Lynde St",
    "lat": 42.39648358247693,
    "long": -71.06546759905541,
    "photo": "photos/broadway-at-lynde-st.jpg"
  },
  {
    "id": 391,
    "name": "Encore",
    "lat": 42.39329263225162,
    "long": -71.0724475979805,
    "photo": "photos/encore.jpg"
  },
  {
    "id": 392,
    "name": "Glendale Square (Ferry St at Broadway)",
    "lat": 42.41480160999569,
    "long": -71.04772560316633
  },
  {
    "id": 393,
    "name": "Ferry St at Pleasantview Ave",
    "lat": 42.40914877754532,
    "long": -71.04597684005057
  },
  {
    "id": 394,
    "name": "Broadway at Maple St",
    "lat": 42.410346909767846,
    "long": -71.05260457852637
  },
  {
    "id": 395,
    "name": "Chelsea St at Vine St",
    "lat": 42.40328056972533,
    "long": -71.04762639859473
  },
  {
    "id": 396,
    "name": "Main St at Beacon St",
    "lat": 42.41072713868097,
    "long": -71.06266822675025,
    "photo": "photos/main-st-at-beacon-st.jpg"
  },
  {
    "id": 397,
    "name": "Broadway at Beacham St",
    "lat": 42.39836059620832,
    "long": -71.06373842814719,
    "photo": "photos/broadway-at-beacham-st.jpg"
  }
];

// styling for the google map
var mapStyles = [
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      { visibility: "on" }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      { color: "#FFFFFF" }
    ]
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      { color: "#DDDDDD" }
    ]
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      { color: "#CCCCCC" }
    ]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "on" }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      { color: "#CCCCCC" }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      { color: "#D5D5D5" }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      { visibility: "off" }
    ]
  },
  /*{
    featureType: "transit",
    elementType: "all",
    stylers: [
      { visibility: "off" }
    ]
  }*/
];

// create station lookup object
var numStations = stations.length;
var stationLookup = {};
for (var i = 0; i < numStations; i++) {
  stationLookup[stations[i].id] = stations[i];
}

// stations we've visited split by day
var trips = [
  {
    color: '#f1c40f',
    date: '2017-05-28',
    stations: [107, 72, 60, 120, 58, 42, 81, 22]
  },
  {
    color: '#2980b9',
    date: '2017-08-13',
    stations: [22, 192, 43, 151, 20, 40, 98, 85, 129, 94, 169, 171, 84, 185, 80, 67, 53, 52]
  },
  {
    color: '#e67e22',
    date: '2018-03-03',
    stations: [182, 84, 90, 195, 143, 98, 94]
  },
  {
    color: '#e67e22',
    date: '2018-03-18',
    stations: [22, 65, 119, 146, 163, 22]
  },
  {
    color: '#c0392b',
    date: '2018-03-30',
    stations: [94, 47, 20, 151, 157]
  },
  {
    color: '#2ecc71',
    date: '2018-03-31',
    stations: [82, 69, 11, 30, 14, 3, 160, 46, 21, 16, 49, 81]
  },
  {
    color: '#0000ff',
    date: '2018-06-23',
    stations: [45, 55, 61, 36, 134, 50, 42, 81]
  },
  {
    color: '#ff0000',
    date: '2018-06-24',
    stations: [124, 133, 131, 27, 12, 57, 25, 4, 152, 222, 81]
  },
  {
    color: '#00ff00',
    date: '2018-06-30',
    stations: [100, 114, 102, 137, 111, 112, 118, 183, 142, 145, 140, 224, 181, 74]
  },
  {
    color: '#27ae60',
    date: '2018-09-08',
    stations: [236, 194, 235, 329, 78, 88, 95, 225, 116, 76, 68, 75, 177, 184, 179, 9, 10, 227]
  },
  {
    color: '#d35400',
    date: '2019-05-11',
    stations: [76, 87, 97, 70, 73, 221, 96, 110, 108, 89, 104, 176, 115]
  },
  {
    color: '#16a085',
    date: '2019-05-17',
    stations: [59, 64, 157, 218, 24, 7, 31, 186, 136, 135]
  },
  {
    color: '#1abc9c',
    date: '2019-05-19',
    stations: [217, 355, 210, 209, 216, 214, 219, 215, 212, 213, 211]
  },
  {
    color: '#3498db',
    date: '2019-05-25',
    stations: [226, 41, 332, 103, 66, 338, 354, 346, 344, 175, 174, 208, 351, 37, 8]
  },
  {
    color: '#9b59b6',
    date: '2019-05-26',
    stations: [65, 163, 150, 63, 366, 161, 121]
  },
  {
    color: '#f39c12',
    date: '2019-06-01',
    stations: [336, 340, 353, 343, 347, 350, 349, 348, 259, 232, 202, 196, 204, 56, 200, 51, 39, 26, 363, 365]
  },
  {
    color: '#8e44ad',
    date: '2019-06-08',
    stations: [100, 328, 239, 156, 234, 188, 77, 330, 377, 79, 378, 71]
  },
  {
    color: '#2c3e50',
    date: '2019-06-12',
    stations: [133, 357, 124, 279, 126, 282, 125, 159, 86]
  },
  {
    color: '#fdcb6e',
    date: '2019-06-27',
    stations: [236, 391, 390, 397, 388, 387, 396, 389]
  }
];

function diffStations() {
  var changesDetected = false;
  var numNameChanged = 0;
  var numLocationChanged = 0;
  var unaccounted = [];

  if ((typeof newStations == 'undefined') || !newStations || !newStations.stations) {
    return;
  }

  // find new stations and ones whose name has changed
  newStations.stations.forEach(newStation => {
    var found = stations.find(station => station.id === newStation.id);
    if (!found) {
      unaccounted.push({
        id: newStation.id,
        name: newStation.s,
        lat: newStation.la,
        long: newStation.lo
      });
      console.log('new station', newStation.s);
    } else if (found.name !== newStation.s) {
      console.log('station ' + newStation.id + ' name changed from "' + found.name + '" to "' + newStation.s + '"');
      found.name = newStation.s;
      numNameChanged++;
    } else if (found.lat !== newStation.la || found.long !== newStation.lo) {
      const calcPercentChange = (a, b) => Math.abs((b - a) / a) * 100;
      const percentChangeLat = calcPercentChange(found.lat, newStation.la);
      const percentChangeLong = calcPercentChange(found.long, newStation.lo);
      const avgPercentChange = (percentChangeLat + percentChangeLong) / 2;
      console.log('station "' + found.name + '" location has changed from (' + found.lat + ', ' + found.long + ') to (' + newStation.la + ', ' + newStation.lo + '), percent change ' + avgPercentChange);
      found.lat = newStation.la;
      found.long = newStation.lo;
      numLocationChanged++;
    }
  });

  // find stations that kept the same name but changed ids
  const duplicatedSameNameStations = stations.filter(station => !!newStations.stations.find(
    newStation => (station.id !== newStation.id) && (station.name === newStation.s)
  ));
  if (duplicatedSameNameStations.length) {
    console.log(duplicatedSameNameStations.length + ' stations have been duplicated with the same name', duplicatedSameNameStations);
  } else {
    console.log('no duplicated stations with the same name found');
  }

  // find stations that kept the same location but changed ids
  const duplicatedSameLocationStations = stations.filter(station => !!newStations.stations.find(
    newStation => (station.id !== newStation.id) && (station.lat === newStation.la) && (station.long === newStation.lo)
  ));
  if (duplicatedSameLocationStations.length) {
    console.log(duplicatedSameLocationStations.length + ' stations have been duplicated with the same location', duplicatedSameLocationStations);
  } else {
    console.log('no duplicated stations with the same location found');
  }

  if (newStations.stations.length < stations.length) {
    const legacyStations = stations.filter(station => !newStations.stations.find(newStation => station.id === newStation.id));
    if (legacyStations.length) {
      console.log(legacyStations.length + ' legacy stations found', legacyStations);
    }
  }

  if (unaccounted && unaccounted.length > 0) {
    stations = stations.concat(unaccounted);
    stations.sort((a, b) => {
      return (a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0);
    });
    console.log(unaccounted.length + ' new stations found');
    changesDetected = true;
  } else {
    console.log('no new stations found');
  }

  if (numNameChanged > 0) {
    console.log(numNameChanged + ' station name changes detected');
    changesDetected = true;
  } else {
    console.log('no station name changes detected');
  }

  if (numLocationChanged > 0) {
    console.log(numLocationChanged + ' station location changes detected');
    changesDetected = true;
  } else {
    console.log('no station location changes detected');
  }

  if (changesDetected) {
    console.log(JSON.stringify(stations));
  }
}

diffStations();

function drawDayRoute(visited, color, map) {
  var numVisited = visited.length;
  var dayCoords = [];

  for (var i = 0; i < numVisited; i++) {
    dayCoords.push({
      lat: stationLookup[visited[i]].lat,
      lng: stationLookup[visited[i]].long
    });
  }

  var dayLine = new google.maps.Polyline({
    path: dayCoords,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  dayLine.setMap(map);
}

function initialize() {
  var mapOptions = {
    center: { lat: 42.3615287, lng: -71.0677415 },
    zoom: 14,
    disableDefaultUI: false,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    styles: mapStyles
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var visited = [];
  var numTrips = trips.length;
  for (var i = 0; i < numTrips; i++) {
    visited = _.union(visited, trips[i].stations);
  }

  var numStations = stations.length;
  var numVisited = visited.length;

  var percentComplete = Math.round((numVisited / numStations) * 100);
  console.log(numVisited + ' stations visited, ' + (numStations - numVisited) + ' stations remaining, ' + numStations + ' stations total, ' + percentComplete + '% complete');

  var completedBar = document.getElementsByClassName('ProgressBar-completed')[0];
  completedBar.style.width = `${percentComplete}%`;

  var percentageEl = document.getElementsByClassName('ProgressBar-percentage')[0];
  percentageEl.innerHTML = `${percentComplete}%`;

  var stationsVisitedEl = document.getElementsByClassName('ProgressBar-stationsComplete')[0];
  stationsVisitedEl.innerHTML = `${numVisited} stations visited`;

  var numStationsEl = document.getElementsByClassName('ProgressBar-max')[0];
  numStationsEl.innerHTML = numStations;

  var reversedTrips = trips.slice().reverse();
  var tripHtml = [
    '<ul>',
    ...reversedTrips.map(trip => {
      const dateObj = moment(trip.date, 'YYYY-MM-DD');
      return `<li>${dateObj.format('MMM D, YYYY')} - ${trip.stations.length} stations</li>`;
    }),
    '</ul>'
  ].join('');
  var tripHistoryEl = document.getElementsByClassName('TripHistory')[0];
  tripHistoryEl.innerHTML = tripHtml;

  for (var i = 0; i < numStations; i++) {
    let isVisited = false;
    for (var j = 0; j < numVisited; j++) {
      if (stations[i].id === visited[j]) {
        isVisited = true;
        var marker = new google.maps.Marker({
          icon: {
            scaledSize: new google.maps.Size(20, 20),
            url: stations[i].photo || 'img/marker-filled.png',
            strokeColor: '#000000'
          },
          map: map,
          position: new google.maps.LatLng(stations[i].lat, stations[i].long),
          title: stations[i].name,
          photo: stations[i].photo,
          isLegacy: stations[i].isLegacy
        });
        break;
      }
    }
    if (!isVisited) {
      var marker = new google.maps.Marker({
        icon: {
          scaledSize: new google.maps.Size(20, 20),
          url: 'img/marker-outline.png'
        },
        map: map,
        position: new google.maps.LatLng(stations[i].lat, stations[i].long),
        title: stations[i].name,
        photo: stations[i].photo
      });
    }

    var infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
      var content = '<h4 style="margin: 0; width: 200px;">' + this.title + (this.isLegacy ? ' (Legacy)' : '') + '</h4>';
      if (this.photo) {
        content += '<img src="' + this.photo + '" style="margin-top: 10px; height: 200px; width: 200px;" />';
      }
      infoWindow.setContent(content);
      infoWindow.open(map, this);
    });
  }

  for (var i = 0; i < numTrips; i++) {
    drawDayRoute(trips[i].stations, trips[i].color, map);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
