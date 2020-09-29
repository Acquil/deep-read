from screenclassifier import ScreenClassifier

classifier = ScreenClassifier()

directory = '' #path to images folder
filenames = classifier.predict(directory)