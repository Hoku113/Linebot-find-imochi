import pathlib
import shutil
import os

def change_suffix(file_name, from_suffix, to_suffix):
    sf = pathlib.PurePath(file_name).suffix

    if sf == from_suffix:
        st = pathlib.PurePath(file_name).stem

        to_name = st + to_suffix

        shutil.move(file_name, to_name)

path = './images/'

files = os.listdir(path)
first = [f for f in files if os.path.isfile(os.path.join(path, f))]
os.chdir(path)

for x in first:
    change_suffix(x, '.svg', '.jpg')
