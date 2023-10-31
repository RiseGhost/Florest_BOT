#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int indexUnits(char* units){
	if (strcmp("km",units) == 0) 		return 0;
	else if (strcmp("hm",units) == 0) 	return 1;
	else if (strcmp("dam",units) == 0)	return 2;
	else if (strcmp("m",units) == 0)	return 3;
	else if (strcmp("dm",units) == 0) 	return 4;
	else if (strcmp("cm",units) == 0)	return 5;
	else if (strcmp("mm",units) == 0)	return 6;
	else return 0;
}

char* convert(char* x,char* y,double value){
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
	char* number = (char*) malloc(sizeof(char) * 100);
	sprintf(number,"%f",v);
	return number;
}