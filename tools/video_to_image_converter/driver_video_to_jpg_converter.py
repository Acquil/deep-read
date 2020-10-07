from video_to_jpg_converter import Video_to_JPG_Converter
video_path = "/media/ashwin/Current/sem_9/open_source/my_work/videoplayback.mp4"
render_path = "./data"
offset_duration_seconds = 10
video_to_jpg_converter = Video_to_JPG_Converter(video_path, render_path, offset_duration_seconds)
video_to_jpg_converter.convert()
