import numpy as np 
import time
import csv
from keras.models import Sequential 
from keras.layers.core import Dense, Activation, Dropout
from keras.layers import SimpleRNN, Activation, Dense  
import pandas as pd  
import sys

from keras.layers.recurrent import LSTM 
from keras.models import load_model 

district=['A2','A4','B2','B3','B4','B5','C0','C2','C3','C4','C5','D0','D1','D2','D3','D4','D5','D6',
'E1','E2','E3','E4','E5','E6','F0','F1','F2','F3','F4','F5','F6','G0','G1','G2','G3','G4','G5','H0','H1','H2','H3','H4','I0','I1','I2','I3','I4','I5']
#month=sys.argv[1]
#dayofweek=sys.argv[2]
#time=sys.argv[3]
#hour=sys.argv[4]

#model=load_model("big_model.h5")
train=[]
module=[]
for(int i=0; i<4; i++){
    train[i]=sys.argv[i]
}
# district number
# train[4]=______
module[0]=train
output=model.predict(np.array(module))
print(output)
sys.stdout.flush()
