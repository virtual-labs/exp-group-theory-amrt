if ( ! Detector.webgl ) {Detector.addGetWebGLMessage(); } //alert("Check that WebGL is enabled in your browser.");
window.onload=init;"initEvent";

// Variables Declarations 
var scene;
var camera;
var renderer;
var model;
var model1;
var controls;			
var pointLight
var clock = new THREE.Clock();
var parent;
var targetYRotation = targetXRotation = 0;
var zoomFactor=-3;
var targetYRotationOnMouseDown = targetXRotationOnMouseDown = 0;
var mouseX = 0, mouseY = 0;
var mouseXOnMouseDown = 0;
var mouseYOnMouseDown = 0; 
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var PGbySteps;  //Pont Group by steps of systematic method 
var molIndex=0;
var molSelect;
var grpSelect="Oh";
var yesflag=0;
var yes1_flg=0;
var yes2_flg=0;
var noflag=0;
var no1_flg=0;
var noflag1=0;
var noflag3=0;
var noArr1Flag=0;
var yesArr2Flag=0;
var yesArr3Flag=0;
var yesArr4Flag=0;
var grpIndex;
var grp;
var molIndex;
var mol;
// Array Declarations


var molArray=["S-trans-1,2 dichloro 1,2-difluoro ethane","Meso tartaric acid","quinoline","Hocl","Bromo Ethylene","SiO"+String.fromCharCode(8324)+"(CH"+String.fromCharCode(8323)+")"+String.fromCharCode(8324),"Bromo Chloro Fluoro methane","Lactic acid","H"+String.fromCharCode(8322)+"O"+String.fromCharCode(8322),"Hexahelicene","Triphenylphosphine","H"+String.fromCharCode(8322)+"0","SO"+String.fromCharCode(8322),"SF"+String.fromCharCode(8324),"ClF"+String.fromCharCode(8323),"o-Dichloro Benzene","m-Dichlorobenzene","Cis-Dichloro Ethene","Phenanthrene","S-cis-1,3-Butadiene","Pyridine","NH"+String.fromCharCode(8323),"POCl"+String.fromCharCode(8323),"Chloro Methane","XeOF"+String.fromCharCode(8324),"IF"+String.fromCharCode(8325),"N"+String.fromCharCode(8322)+"F"+String.fromCharCode(8322),"S-trans-1,3-Butadiene","trans-1,2-Dichloro Ethylene","1,5-Dibromo Naphthalene","Glyoxal","1,4-Difluoro-2,5-dichloro benzene","Boric acid","Biphenyl ","C"+String.fromCharCode(8322)+"H"+String.fromCharCode(8324),"B"+String.fromCharCode(8322)+"H"+String.fromCharCode(8326),"Naphthalene","Anthracene","p-Dichlorobenzene","BF"+String.fromCharCode(8323),"CO"+String.fromCharCode(8323,178,8315),"PCl"+String.fromCharCode(8325),"1,3,5-Tribromobenzene","Borazole","Phenalene","PtCl"+String.fromCharCode(8324,178,8315),"XeF"+String.fromCharCode(8324),"trans-[CoCl"+String.fromCharCode(8322)+"(NH"+String.fromCharCode(8323)+")"+String.fromCharCode(8324)+"]"+String.fromCharCode(8314),"C"+String.fromCharCode(8325)+"H"+String.fromCharCode(8325,8315),"IF"+String.fromCharCode(8327),"Ferrocene (eclipsed)","Benzene","Coronene","Dibenzenechromium","Tropylium cation","Cyclooctatetraene dianion","Uranocene ","Allene","Cyclohexane","Ethane","Mn"+String.fromCharCode(8322)+"(CO)"+String.fromCharCode(8321,8320),"Ferrocene (staggered)","CH"+String.fromCharCode(8324),"CCl"+String.fromCharCode(8324),"SF"+String.fromCharCode(8326),"Cubane","Fullerene","B"+String.fromCharCode(8321,8322)+"H"+String.fromCharCode(8321,8322,178,8315),"H"+String.fromCharCode(8322),"CO"+String.fromCharCode(8322),"Acetylene","BeF"+String.fromCharCode(8322),"HCl","SO","C"+String.fromCharCode(8322)+"O"];


var pointGroup_arr=['Oh','Ih','D'+String.fromCharCode(945)+'h','S4','C1','C2','C3','C2v','C3v','C4v','C2h','C3h','D2','D2h','Ci','D3h','D4h','D5h','D6h','D7h','D8h','D2d','D3d','D4d','D5d','Td','Cs','C'+String.fromCharCode(945)+'v']


var daeArray=['S-trans-1-2dichloro1-2-difluoroethane','MesoTartaricAcid','Quinoline','HOCI','BromoEthene','SiO4','BromoChloroFluoromethane','LacticAcid','H2O2','Hexahelicene','Triphenylphosphine','H20','SO2','SF4','ClF3','oDichloroBenzene','m-Dichlorobenzene','Cis-DichloroEthene','Phenanthrene','Butadiene','Pyridine','NH3','POCl3','ChloroMethane','XeOF4','IF5','N2F2','S-trans-1-3-Butadiene','trans12DichloroEthylene','DibromoNaphthalene','Glyoxal','1_4_Difluoro2_5_dichloro_benzene','BoricAcid','Biphenyl_skew','C2H4','B2H6','Naphthalene','Antrancene','P_Dichlorobenzene','BF3','CO32','PCl5','Tribromozene','Borazole','Phenanthrene','PtCl42','XeF4','trans','C5H5','IF7','Ferrocene(eclispsed)','Benzene','Coronene','Dibenzenechromium','TropyliumCation','Cyclooctatetraene','Uranocene','Allene','Cyclohexane','Ethane','Mn2(CO)10','Ferrocene(staggered)','CH4','CC14','SF6','Cubane','Fullerene','B12H122','H2','CO2','Acetylene','Bef2','HCl','SO','C2O'];
var arr_cn_axis1=["C"+String.fromCharCode(8321),"C"+String.fromCharCode(8322),"C"+String.fromCharCode(8323),"C"+String.fromCharCode(8324),"C"+String.fromCharCode(8325),"C"+String.fromCharCode(8326),"C"+String.fromCharCode(8327),"C"+String.fromCharCode(8328)];
var arr_cn_axis2=["2C"+String.fromCharCode(8322),"3C"+String.fromCharCode(8322),"4C"+String.fromCharCode(8322),"5C"+String.fromCharCode(8322),"7C"+String.fromCharCode(8322),"7C"+String.fromCharCode(8322),"8C"+String.fromCharCode(8322)];
daeName=daeArray[0];
var arr1=["Tetrahedral, Identify the point group","Octahedral,  Identify the point group","Icosahedral"];
var plane_arr=[" n&#963;h,  Identify  the point group  "," n&#963;d,   Identify the point group "];
var plane_arr2=["n&#963;h,   Identify the point group","n&#963;v,   Identify the point group"];
var check_yes=["D'+String.fromCharCode(945)+'h","C5","S4","Ci"];
var check_no=["C'+String.fromCharCode(945)+'v","D2","c1","C1"];
var yesArr=["There is an inversion centre?","Identify the point group"];
var yesArr1=["Are there nC2 perpendicular to Cn?","Is there any dihedral plane?","Does it belongs to &#963;h?","Identify the point group?"];
var noArr=["Is there any Cn axis of symmetry?","Does the molecule belong to tetrahedral?","Does  the molecule belong to Octahedral?","Does  the molecule belong to Icosahedral?"];
var noArr1=["Is there any Cn axis present?","Is there any reflection plane?","Is there any Sn axis of symmetry?","Is there centre of symmetry?","Identify the point group"];
var yesArr2=["Identify the point group","Identify the point group"];
var noArr_1=["Does the molecule belong to tetrahedral?","Is there any Cn axis present?"];
var yesArr3=["Is there any dihedral plane?","Does it belongs to nsh ?","Identify the point group?"];

var point_arr=['Ci','Ci','Cs','Cs','Cs','S4','C1','C1','C2','C2','C3','C2v','C2v','C2v','C2v','C2v','C2v','C2v','C2v','C2v','C2v','C3v','C3v','C3v','C4v','C4v','C2h','C2h','C2h','C2h','C2h','C2h','C3h','D2','D2h','D2h','D2h','D2h','D2h','D3h','D3h','D3h','D3h','D3h','D3h','D4h','D4h','D4h','D5h','D5h','D5h','D6h','D6h','D6h','D7h','D8h','D8h','D2d','D3d','D3d','D4d','D5d','Td','Td','Oh','Oh','Ih','Ih','D'+String.fromCharCode(945)+'h','D'+String.fromCharCode(945)+'h','D'+String.fromCharCode(945)+'h','D'+String.fromCharCode(945)+'h','C'+String.fromCharCode(945)+'v','C'+String.fromCharCode(945)+'v','C'+String.fromCharCode(945)+'v'];

var sym_elements=["Only Ci","Only Ci","Only &#963; plane","Only &#963; plane","Only &#963; plane","C4+&#963;h","Only C"+String.fromCharCode(8321),"Only C"+String.fromCharCode(8321),"Only C"+String.fromCharCode(8322),"Only C"+String.fromCharCode(8322),"Only C"+String.fromCharCode(8323),"C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8322)+"+2&#963;v","C"+String.fromCharCode(8323)+"+3&#963;v","C"+String.fromCharCode(8323)+"+3&#963;v","C"+String.fromCharCode(8323)+"+3&#963;v","C"+String.fromCharCode(8324)+"+4&#963;v","C"+String.fromCharCode(8324)+"+4&#963;v","C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8323)+"+2&#963;h","C"+String.fromCharCode(8322)+"+2C"+String.fromCharCode(8322)+"","C"+String.fromCharCode(8322)+"+2C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+2C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+2C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+2C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+2C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8324)+"+4C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8324)+"+4C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8324)+"+4C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8325)+"+5C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8325)+"+5C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8325)+"+5C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8326)+"+5C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8326)+"+5C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8326)+"+5C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8327)+"+7C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8328)+"+8C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8328)+"+8C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(8322)+"+2C"+String.fromCharCode(8322)+"+2&#963;d","C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+3&#963;d","C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+3&#963;d","C"+String.fromCharCode(8324)+"+4C"+String.fromCharCode(8322)+"+4&#963;d","C"+String.fromCharCode(8325)+"+5C"+String.fromCharCode(8322)+"+5&#963;d","4C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+6&#963;d","4C"+String.fromCharCode(8323)+"+3C"+String.fromCharCode(8322)+"+6&#963;d","3C"+String.fromCharCode(8324)+"+4C"+String.fromCharCode(8323)+"+6C"+String.fromCharCode(8322)+"+3&#963;d","3C"+String.fromCharCode(8324)+"+4C"+String.fromCharCode(8323)+"+6C"+String.fromCharCode(8322)+"+3&#963;d","","","C"+String.fromCharCode(945)+"+"+String.fromCharCode(945)+"C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(945)+"+"+String.fromCharCode(945)+"C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(945)+"+"+String.fromCharCode(945)+"C"+String.fromCharCode(8322)+"+&#963;h","C"+String.fromCharCode(945)+"+"+String.fromCharCode(945)+"C2+"+String.fromCharCode(945)+"h","C"+String.fromCharCode(945)+"+"+String.fromCharCode(945)+"&#963;v","C"+String.fromCharCode(945)+"+"+String.fromCharCode(945)+"&#963;v","C"+String.fromCharCode(945)+"+"+String.fromCharCode(945)+"&#963;v"];


// onloading function .....	 
function init() {

	
	for(var i=0; i<molArray.length; i++){
		document.lister.molecule.options[i]=new Option(molArray[i], i);
	}
	for(var j=0; j<pointGroup_arr.length; j++){
		document.lister.grouup.options[j]=new Option(pointGroup_arr[j], j);
	}
	var container = document.getElementById( 'canvasBox' );


	// Camera
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1000 );
	camera.position.set( -5.00181875, 3.42631375, 11.3102925 );	
	camera.lookAt( new THREE.Vector3( -1.224774125, 2.18410625, 4.57969125 ) );
	
	// Scene
	//scene = new THREE.Scene();
		
	
	//For rotation
	parent = new THREE.Object3D();
	
	
	
	parent.position.y = parent.position.y +3;
	parent.position.z = parent.position.z + zoomFactor;	
	initParentY	=parent.position.y;
	initParentX	=parent.position.x;
	initParentZ	=parent.position.z
	
	
	//scene.add( parent );	
	
	
	 //Lights
	pointLight = new THREE.PointLight( 0xffffff, 1 );
	pointLight.position = camera.position;
	//scene.add( pointLight );
	loadMolecule();	

	// Renderer

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize(window.innerWidth,window.innerHeight);
	container.appendChild( renderer.domElement );	
	
					
	document.getElementById( 'canvasBox' ).addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.getElementById( 'canvasBox' ).addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.getElementById( 'canvasBox' ).addEventListener( 'touchmove', onDocumentTouchMove, false );
	

				
}

function onDocumentMouseDown( event ) {
	event.preventDefault();
	document.getElementById( 'canvasBox' ).addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.getElementById( 'canvasBox' ).addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.getElementById( 'canvasBox' ).addEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseXOnMouseDown = (event.clientX - windowHalfX);
	mouseYOnMouseDown = event.clientY - windowHalfY;
	targetYRotationOnMouseDown = targetYRotation;
	targetXRotationOnMouseDown = targetXRotation;
	
}

function onDocumentMouseMove( event ) {			

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
	targetYRotation = targetYRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
	targetXRotation = targetXRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;
}

function onDocumentMouseUp( event ) {

	document.getElementById( 'canvasBox' ).removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.getElementById( 'canvasBox' ).removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.getElementById( 'canvasBox' ).removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	document.getElementById( 'canvasBox' ).removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.getElementById( 'canvasBox' ).removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.getElementById( 'canvasBox' ).removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {
	
	if ( event.touches.length == 1 ) {
		document.getElementById( 'canvasBox' ).addEventListener( 'touchmove', onDocumentTouchMove, false );
		event.preventDefault();
		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
		//targetRotationOnMouseDown = targetXRotation;
		targetYRotationOnMouseDown = targetYRotation;
		targetXRotationOnMouseDown = targetXRotation;

	}

}

function onDocumentTouchMove( event ) {
	
	if ( event.touches.length == 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
		targetXRotation = targetXRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
		targetYRotation = targetYRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.05;
      
	}

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}			

function animate() {
	requestAnimationFrame(animate,model1);	
	renderer.clear();
	renderer.render( scene, camera );
	parent.rotation.x += ( targetXRotation - parent.rotation.x ) * 0.05;		
	parent.rotation.y += ( targetYRotation - parent.rotation.y ) * 0.05;	
}

// For selecting molecule from the combobox ..
function selectedMolecule(){
	
	var x=document.getElementById("molecule").selectedIndex;
	molIndex=x;
	daeName=daeArray[x];	
	parent.remove(model1);	
	model1=null;
	targetXRotation=0;
	targetYRotation=0;	
	loadMolecule();
	applyZoomFactor();
	onchgCombo();
	enableButton();
	
	
}
function applyZoomFactor(){	

var mediumMolArr=[molArray[6],molArray[5],molArray[66]];	
	
var bigMolArr=[molArray[7],molArray[34],molArray[69]];
	
var smallMolArr=[molArray[2],molArray[3],molArray[13],molArray[14],molArray[15],molArray[16],molArray[19],molArray[21],molArray[22],molArray[23],molArray[24],molArray[25],molArray[26],molArray[27],molArray[29],molArray[31],molArray[38],molArray[39],molArray[42],molArray[43],molArray[45],molArray[46],molArray[50],molArray[52],molArray[53],molArray[57],molArray[60],molArray[61],molArray[62],molArray[64],molArray[65],molArray[67],molArray[68],molArray[71],molArray[73]]

	

parent.position.z = initParentZ ;
parent.position.x = initParentX ;

//To zoom in
for (var i=0;i<mediumMolArr.length;i++){
	
		if (molArray[molIndex]==mediumMolArr[i]){
				
			zoomFactor=-8;
			parent.position.z = parent.position.z  + zoomFactor;	
			parent.position.x = parent.position.x  + 2;;	
			break;
		}		
	}

//To zoom 0ut
for (var i=0;i<bigMolArr.length;i++){
	
		if (molArray[molIndex]==bigMolArr[i]){	
		
			zoomFactor=-20;
			parent.position.z = parent.position.z  + zoomFactor;
			parent.position.x = parent.position.x  + 8;	
			break;
		}		
	}


//To zoom in
	for (var i=0;i<smallMolArr.length;i++){	
	
		if (molArray[molIndex]==smallMolArr[i]){	
		
		if (molIndex==60){//Mn2CO10
			zoomFactor=8;
			parent.position.z = parent.position.z  + zoomFactor;	
			parent.position.x = parent.position.x  -3;;	
		}else{			
			zoomFactor=5;		
			parent.position.z = parent.position.z  + zoomFactor;	
			parent.position.x = parent.position.x  -2;;	
		}	
			break;
		}		
	}
	
	
}

// For loading molecule on the stage ..
function loadMolecule()
{
	var collada1;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( '../CHE/INC/Group_theory/'+daeName+'.dae', function ( collada1 ) {	
		scene = new THREE.Scene();
		scene.add( parent );					
		scene.add( pointLight );	
		model1 = collada1.scene;	
		//scene.add( model1 );	
		parent.add(model1);	
		animate();				
	} );
			
}
// For selecting cn axis from the combobox ..
function selectedCnAxis(){
	molIndex=document.getElementById("cnaxis").selectedIndex;
	mol=document.getElementById("cnaxis").options;
	molSelect=mol[molIndex].text;
	onchgCombo();
	
	
}
// For selecting group from the combobox ..
function groupCombo(){	
	grpIndex=document.getElementById("grouup").selectedIndex;
	grp=document.getElementById("grouup").options;
	grpSelect=grp[grpIndex].text;
	onchgCombo();
	
}
//yes button function...
function linear_Yes() {	
	shake_these();
	if (yesArr.length>yesflag&&noflag==0) {
		document.getElementById("molText").innerHTML=yesArr[yesflag];
		yesflag++;
		if (yesflag==2&&yes1_flg==0) {
			disableGroupBtn();
			PGbySteps='D'+String.fromCharCode(945)+'h';
		}
	}
	if (noflag>0) {
		if (noflag==2) {
			document.getElementById("molText").innerHTML="Identify the point group";
			disableGroupBtn();		
			PGbySteps="Td";
		}
		if (noflag==3) {
			document.getElementById("molText").innerHTML="Identify the point group";
			disableGroupBtn();
			PGbySteps="Oh";
			
		}
		
		if (yesArr1.length>yes1_flg&&noflag==1) {
			
			document.getElementById("molText").innerHTML=yesArr1[yes1_flg];
			if(yes1_flg==0)
			{
				document.getElementById("cnAxisDiv").style.visibility='visible';
				document.getElementById("cnText").innerHTML="Select the Cn axis?";
				for(var k=0; k<arr_cn_axis1.length; k++){
					document.lister.cnaxis.options[k]=new Option(arr_cn_axis1[k], k);
				}
				
			}
			if(yes1_flg==1)
			{
				
				//document.getElementById("cnAxisDiv").style.visibility='visible';
				document.getElementById("cnText").innerHTML="Select the nC2 axis?";
				for(var s=0; s<arr_cn_axis2.length; s++){
					document.lister.cnaxis.options[s]=new Option(arr_cn_axis2[s], s);
				}
				PGbySteps="Ci";
			   
			}
			if(yes1_flg==2)
			{		
				
				document.getElementById("cnAxisDiv").style.visibility='hidden';	
				PGbySteps="nC2";
			    
			}
						
			yes1_flg++;
			if (document.getElementById("molText").innerHTML=="Identify the point group?") {				
				disableGroupBtn();			
				
			}
			if (yes1_flg==yesArr1.length) {
				disableGroupBtn();				
				PGbySteps="nC2";
			}
			
		}
	}
	if (noArr1Flag==noArr1.length-1) {
		yes1_flg++;
		document.getElementById("molText").innerHTML="Identify the point group";
		disableGroupBtn();
	}
	if (noArr1Flag==2) {
		document.getElementById("molText").innerHTML=yesArr2[yesArr2Flag];
		yesArr2Flag++;
		if (document.getElementById("molText").innerHTML=="Identify the point group") {
			disableGroupBtn();
			PGbySteps="Cs";			
		}
	}
	if (noArr1Flag==3) {
		yesArr2Flag++;
		document.getElementById("molText").innerHTML=yesArr2[yesArr2Flag];
		if (document.getElementById("molText").innerHTML=="Identify the point group") {
			disableGroupBtn();		
		}

	}
	if (noArr1Flag==1) {
		document.getElementById("molText").innerHTML=yesArr3[yesArr3Flag];
		if(yesArr3Flag==0)
		{	
			document.getElementById("cnAxisDiv").style.visibility='visible';
			document.getElementById("cnText").innerHTML="Select the Cn axis?";
			for(var k=0; k<arr_cn_axis1.length; k++){
				document.lister.cnaxis.options[k]=new Option(arr_cn_axis1[k], k);
			}
			
		}		
		yesArr3Flag++;
		if (yesArr3Flag==yesArr3.length) {
			document.getElementById("yes").disabled=true;
			document.getElementById("no").disabled=true;	
		}
	}
}
//No button functions...
function linear_No() {
	shake_these();
	if (yesArr3Flag==yesArr3.length-1) {
		document.getElementById("molText").innerHTML="Does it belongs to n&#963;v?";
		 disableGroupBtn();	
	} else if (yes1_flg==yesArr1.length-1) {		
		document.getElementById("molText").innerHTML="Does it belongs to &#963;d?";
		disableGroupBtn();	
		
	} else if (yes1_flg==2 || yes1_flg==1 || noArr1Flag>0 ) {
		if (noArr1Flag<noArr1.length) {
			if (document.getElementById("molText").innerHTML=="Is there any Sn axis of symmetry?") {
				document.getElementById("yes").disabled=true;

			}
			if(noArr1Flag==0)
			{
				document.getElementById("cnAxisDiv").style.visibility='hidden';
				//text_result_cn_axis.text=""
			}
			document.getElementById("molText").innerHTML=noArr1[noArr1Flag];
			noArr1Flag++;
			if (document.getElementById("molText").innerHTML=="Is there centre of symmetry?") {
				document.getElementById("yes").disabled=false;
			}
			if (noArr1Flag==noArr1.length) {
				PGbySteps="C1";
			    disableGroupBtn();	
			}
			
		}
	} else if (yesflag==yesArr.length-1) {
		
		document.getElementById("molText").innerHTML="Identify the point group";
		disableGroupBtn();	
		PGbySteps='C'+String.fromCharCode(945)+'v';	

	} else {
		if (noflag<noArr.length) {
			document.getElementById("molText").innerHTML=noArr[noflag];
			noflag++;			
			if (noArr.length==noflag) {
				disableGroupBtn();
				PGbySteps="Ih";
				
			}
			
			
		}
	}
}

//Function for disabled  yes/no button 
function disableGroupBtn(){
	document.getElementById("yes").disabled=true;
	document.getElementById("no").disabled=true;
	document.getElementById("submit").disabled=false;
	document.getElementById("grouup").disabled=false;
	document.getElementById("grouup").selectedIndex=0;
	
}
//displays correct or not
function verify() {
	document.getElementById("systematic_txt").innerHTML="Error in systematic method.";
	for (var i=0; i<point_arr.length; i++) {
		if (molIndex==i) {
			
			if (grpSelect==point_arr[i]) {
				document.getElementById("resultText").innerHTML="Point group is correct.";
				document.getElementById("text_Sym_elements").innerHTML="Symmetry Elements  : "+sym_elements[i] ;				
				if (PGbySteps=="nC2"){
				     if (point_arr[i]=="C2" || point_arr[i]=="C3" || point_arr[i]=="C2v" ||point_arr[i]=="C3v" ||point_arr[i]=="C4v" ||point_arr[i]=="C2h" || point_arr[i]=="C3h" ||point_arr[i]=="D2h" || point_arr[i]=="D3h" || point_arr[i]=="D4h" || point_arr[i]=="D5h" || point_arr[i]=="D6h" || point_arr[i]=="D7h" || point_arr[i]=="D8h" || point_arr[i]=="D2d" || point_arr[i]=="D3d" || point_arr[i]=="D4d"){
						document.getElementById("systematic_txt").style.visibility='hidden';
							
					 }
				}else if (PGbySteps!=point_arr[i]){
					alert("Hello"+PGbySteps+"!="+point_arr[i]);
					document.getElementById("systematic_txt").style.visibility='visible';					
				}
				document.getElementById("reset").style.top=100+"px";
				document.getElementById("resultText").style.left=20+"px";	
				document.getElementById("resultText").style.top=28+"px";
				document.getElementById("resultText").style.visibility='visible';
				document.getElementById("correct").style.visibility='visible';
				document.getElementById("text_Sym_elements").style.visibility='visible';
				document.getElementById("wrong").style.visibility='hidden';
				if (sym_elements[i] == ""){
					document.getElementById("text_Sym_elements").style.visibility='hidden';
				}else{
					document.getElementById("text_Sym_elements").style.visibility='visible';
				}
			} else {				
				document.getElementById("reset").style.top=70+"px";		
				document.getElementById("resultText").style.left=70+"px";
				document.getElementById("resultText").style.top=32+"px";
				document.getElementById("resultText").style.visibility='visible';
				document.getElementById("resultText").innerHTML="Try again !";
				document.getElementById("text_Sym_elements").style.visibility='hidden';
				document.getElementById("correct").style.visibility='hidden';
				document.getElementById("wrong").style.visibility='visible';
			}

		}
	}
}
// For reseting all functions..
function resetFN(){
	document.getElementById("yes").disabled=false;
	document.getElementById("no").disabled=false;
	document.getElementById("submit").disabled=true;
	document.getElementById("grouup").disabled=true;
	document.getElementById("grouup").selectedIndex=0;
	document.getElementById("text_Sym_elements").style.visibility='hidden';
	document.getElementById("resultText").style.visibility='hidden';
	document.getElementById("systematic_txt").style.visibility='hidden';
	document.getElementById("wrong").style.visibility='hidden';
	document.getElementById("correct").style.visibility='hidden';
	
	
	
}
// Corresponding changes to change all comboboxes   ..
function onchgCombo(){
	document.getElementById("reset").style.top=55+"px";
	document.getElementById("text_Sym_elements").style.visibility='hidden';
	document.getElementById("resultText").style.visibility='hidden';
	document.getElementById("systematic_txt").style.visibility='hidden';
	document.getElementById("wrong").style.visibility='hidden';
	document.getElementById("correct").style.visibility='hidden';
	
}
//Corresponding changes to change 'molecule'  combobox  
function enableButton(){
	document.getElementById("yes").disabled=false;
	document.getElementById("no").disabled=false;
	document.getElementById("submit").disabled=true;
	document.getElementById("grouup").disabled=true;
	document.getElementById("grouup").selectedIndex=0;
	document.getElementById("molText").innerHTML="Molecule is linear or not?";
	yesflag=0;
	yes1_flg=0;
	yes2_flg=0;
	noflag=0;
	no1_flg=0;
	noflag1=0;
	noflag3=0;
	noArr1Flag=0;
	yesArr2Flag=0;
	yesArr3Flag=0;
	yesArr4Flag=0;
	
}
//For text effect..
function shake_these(){
  new Effect.Shake("molText", {duration:0});
  
}