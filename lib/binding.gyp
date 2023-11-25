{
	"targets":[
		{
			"target_name": "Units",
			"sources": ["./Units/index.cpp"]
		},
		{
			"target_name": "CAS",
			"sources": ["./CAS/index.cpp"],
            "cflags_cc": ["-fexceptions"],
		},
		{
			"target_name": "CloneCode",
			"sources": ["./Code/index.cpp"],
		}
	]
}
