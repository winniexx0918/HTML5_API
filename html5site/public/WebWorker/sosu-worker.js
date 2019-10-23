/**
 * @author mac
 */

 var count=0;
 
 for(var n=2;n<=10000000;n++)
 {
 	var is_prime=true;
	for (var i = 2; i <= Math.sqrt(n); i++) 
	{
		if (n % i == 0) {
			is_prime = false;
			break;
		}
	}
		
		if(is_prime)
		{
			count++;
			//postMessage("發現"+count+"個質數，目前check"+n);
		}	
 }
 
 postMessage("1000萬以下的質數一共有"+count+"個。");
 
 