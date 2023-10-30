#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int indexUnits(char* units){
	if (strcmp("km",units)) 		return 0;
	else if (strcmp("hm",units)) 	return 1;
	else if (strcmp("dam",units))	return 2;
	else if (strcmp("m",units))		return 3;
	else if (strcmp("dm",units)) 	return 4;
	else if (strcmp("cm",units))	return 5;
	else if (strcmp("mm",units))	return 6;
	return 0;
}

double convert(char* x,char* y,double value){
	double v = value;
	short delta = (indexUnits(x) - indexUnits(y));
	if (delta > 0){
		while(delta > 0){
			v = v / 10;
			delta--;
		}
	} else{
		while(delta < 0){
			v = v * 10;
			delta++;
		}
	}
	return v;
}