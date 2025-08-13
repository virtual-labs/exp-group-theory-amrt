<form name="lister"  method="post">
<ul>
<li><h1>Variables<span></span></h1>
<div class="varBox"><br />
<!-- For selecting molecule     --> 
<p class="varTitle" >Name of the molecule:
	<select class="dropBox" name="molecule" id="molecule" onChange="selectedMolecule()">      
	</select>
    <!-- For selecting cn and nc2 axis     --> 
    </p><br/><div id="cnAxisDiv" ><p class="varTitle" ><span id="cnText">Select the cn axis:</span>    
	<select class="dropBox" name="cnaxis" id="cnaxis" onChange="selectedCnAxis()">             
	</select>
    </p></div><br/>    
<p class="varTitle1" id="molText" style="opacity:1;">Molecule is linear or not?</p>
<p><input type="button" class="smallButton" value="Yes" id="yes" onclick="linear_Yes()">
<input type="button" class="smallButton" value="No" id="no"  onclick="linear_No()"></p> 
<br/><br/>
<!-- For selecting group     -->  
<p class="varTitle" >Select the group: 
	<p class="varTitle" ><select class="dropBox" name="groups" id="grouup" onChange="groupCombo()" disabled="disabled">  	    
	</select></p>
    <br/>
    <p><input type="button" class="subButton" name="submit" value="Submit" onClick="verify()" id="submit" disabled="disabled"></p><br/>
<li><h1>Controls<span></span></h1>
<div class="varBox iconPos">
<!-- For result icons    -->  
<img id="correct"  src="<?php getSimPath(); ?>images/correct.png" /> 
<img id="wrong"  src="<?php getSimPath(); ?>images/wrong.png" />
<!-- For result text    -->  
<p class="varTitle2" id="resultText"></p>
<p class="varTitle2" id="text_Sym_elements"></p>
<p class="varTitle2" id="systematic_txt"></p>
<!-- For reset function    -->  
<p><input type="button" class="subButton" name="reset" value="Reset" onClick="resetFN();window.location.reload()" id="reset"></p>
</div>
</li>
</ul>
</form>