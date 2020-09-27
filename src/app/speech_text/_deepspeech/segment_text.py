from deepsegment import DeepSegment

def segment(data):
	segmenter = DeepSegment('en')
	seg_text = []
	for text in data:
	  segmenter.segment_long(text),
	  seg_text.extend(segmenter.segment_long(text))
	return seg_text