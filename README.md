# node-nm-parsing
a node based CLI for parsing nonmem lst files

example use via:

```
iojs pnm.js --file=theta-block.lst
```

can be read directly into R via a system call

```
result <- system("iojs pnm.js --file=run001.lst", intern = T)

jsonlite::fromJSON(result[1])

```

## Known bugs

* Only parses given format:

```
$THETA
...
$OMEGA
```


## fixed bugs
Tested parsing against the following styles of implementing $THETA blocks

Examples that DO work
```
$THETA  
(0,26) ; 1 CL: Clearance (L/h)
 (0,180) ; 2 V2: Central Volume (L)
 (0,35) ; 3 Q: Distribution Clearance (L/h)
 (0,270) ; 4 V3: Peripheral Volume (L)
 (0,0.45) ; 5 D1: Duration of Zero-order Absorption Phase (h)
 (0,1.7) ; 6 KA: First-order Absorption Phase Rate (1/h)
 (0,0.8) ; 7 RV: Additive/Constant CV Ratio (-)
 1 ; 8 CRCL_CL
 1 FIX ; 9 WT_CL
 -0.2 ; 10 DS_CL
 1 FIX ; 11 AGE_CL
 1 FIX ; 12 WT_V2
 -0.2 ; 13 DS_V2
 1 ; 14 WT_V3
 -0.2 ; 15 DS_V3
 1 ; 16 WT_Q
 0 FIX ; 17 DS_KA = disease
;; COV THETAS
$OMEGA  BLOCK(3)
 0.1  ; 1 IIV in CL [exp]
```

```
$THETA  (0,39.5527) ; 1 CL
$THETA  (0,21.0651) ; 2 V1
$THETA  (0,0.646472) ; 3 Ka
$THETA  (0,5.26295) ; 3 Q
$THETA  (0,87.5643) ; 5 V2
$THETA  (0,0.404399) ; 6 W
$THETA  (0,0.291992) ; 7 ALAG
$THETA  (0,1) FIX ; 8 F1
$THETA  (0,1) ; CLRACE
$THETA  1 FIX ; CLSEX
$THETA  (0,1) ; VRACE
$THETA  1 FIX ; VSEX
$THETA  (0,1) ; F1SEX
$THETA  (0,1) ; F1RACE
$THETA  (0,1) ; F1FED
$OMEGA  BLOCK(2)
 0.101796
```

As created by SCM:

```
$THETA  (0,40.3019) ; 1 CL
$THETA  (0,21.324) ; 2 V1
$THETA  (0,0.694125) ; 5 Ka
$THETA  (0,5.03804) ; 3 Q
$THETA  (0,84.9954) ; 4 V2
$THETA  (0,0.394942) ; 6 W
$THETA  (0,0.267859) ; 7 ALAG
$THETA  (0,1) FIX ; 8 F1
$THETA  (-1,0.866575,5) ; ALAG1FED1
$THETA  (-1,-0.271396,5) ; CLRACE1
 (-1,0.153276,5) ; CLRACE2
 (-1,0.179968,5) ; CLRACE3
$THETA  (-1,-0.230648,5) ; F1RACE1
 (-1,0.289942,5) ; F1RACE2
 (-1,-0.172198,5) ; F1RACE3
$THETA  (-1,-0.130549,5) ; KASEXF1
$OMEGA  BLOCK(2)
 0.0742298
 ```

 If you have a type of theta block that is not correctly parsed - let me know! 