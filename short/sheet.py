import sys,glob
from PIL import Image, ImageDraw
files=sys.argv[2:]; out=sys.argv[1]
ims=[Image.open(f).convert('RGB').resize((960,402)) for f in files]
cols=2; rows=(len(ims)+1)//2
S=Image.new('RGB',(960*cols,402*rows),'white'); d=ImageDraw.Draw(S)
for i,(im,f) in enumerate(zip(ims,files)):
    x,y=(i%cols)*960,(i//cols)*402; S.paste(im,(x,y)); d.text((x+8,y+6),f.split('/')[-1],fill=(255,0,0))
S.save(out,quality=85)
