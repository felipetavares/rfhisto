v0 = [0.5,-0.5,-0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,0.5,-0.5,0.5,0.5,-0.5,0.5,-0.5]
v1 = [0.577300,-0.577300,0.577300,-0.577300,-0.577300,0.577300,-0.577300,-0.577300,-0.577300,-0.577300,0.577300,-0.577300,-0.577300,0.577300,0.577300,0.577300,0.577300,0.577300,0.577300,0.577300,-0.577300,0.577300,-0.577300,-0.577300]
i = [2,3,4,8,7,6,5,6,2,2,6,7,7,8,4,5,1,4,1,2,4,5,8,6,1,5,2,3,2,7,3,7,4,8,5,4]
i2 = [1,2,3,4,5,6,7,6,1,1,6,5,5,4,3,7,8,3,8,1,3,7,4,6,8,7,1,2,1,5,2,5,3,4,7,3]

for k in i2:
    k = k-1
    #print v0[k*3-1], ",", v0[k*3+1-1], ",", v0[k*3+2-1],","
    print v1[k*3], ",", v1[k*3+1], ",", v1[k*3+2],","