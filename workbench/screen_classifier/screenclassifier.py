import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os
import numpy as np
import pandas as pd


class ScreenClassifier:

    def __init__(self):
        self.model = tf.keras.models.load_model("model_v3_xception")
        self.imagedatagen = ImageDataGenerator(rescale=1/255)

    def predict(self,directory):
	"""
		returns filenames that are slides
	"""
	    filename = os.listdir(directory)
	    dataframe = pd.DataFrame({'filename':filename})

	    predict_generator = self.imagedatagen.flow_from_dataframe(
		     dataframe,
		     directory=directory,
		     x_col="filename",
		     target_size=(299, 299),
		     class_mode=None,
		     batch_size=32,
		     shuffle=False
			)

	    prob = self.model.predict(predict_generator).flatten()
	    slides_index = np.array(np.where(prob>0.7)).flatten()

	    return dataframe.iloc[slides_index,0].tolist()