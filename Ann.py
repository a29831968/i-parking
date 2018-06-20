import sys
from keras.models import load_model

import numpy as np
import pandas as pd

from keras.models import Sequential
from keras.layers.core import Dense, Activation
from keras.optimizers import Adam
from keras.utils import np_utils


time = (int(sys.argv[1].split(':')[0])*100+int(sys.argv[1].split(':')[1]))/2400
i = int(sys.argv[1].split(':')[0])%24
if 0<=i and i<12:
	period = 1/3
elif 12<=i and i<17:
	period = 2/3
else:
	period = 3/3
dayOfWeek = (int(sys.argv[2])+1)/7
month = int(sys.argv[3])/12
lng = ((float(sys.argv[4][1:len(sys.argv[4])-1].split(',')[1])-120.16)//0.01+1)/10
lat = ((float(sys.argv[4][1:len(sys.argv[4])-1].split(',')[0])-22.96)//0.01+1)/7
toPredict = np.array([[time,period,dayOfWeek,month,lng,lat]])
#print(toPredict)
model = load_model("ann.h5")
result = model.predict(toPredict)
#print(result[0])
print(list(result[0]).index(np.amax(result)))
