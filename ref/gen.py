import numpy as np, json
from PIL import Image, ImageDraw, ImageFont

SRC='/home/user/steadfast-scroller/ref/eyes-reference.jpg'
im=Image.open(SRC).convert('L')
W,H=im.size
a=np.asarray(im,dtype=np.float32)/255.0
dark=1.0-a                                  # 1 = black ink

# light blur of darkness for cell averaging via gradient on smoothed
def box(img,k):
    pad=np.pad(img,k,mode='edge'); out=np.zeros_like(img)
    cs=np.cumsum(np.cumsum(pad,0),1)
    cs=np.pad(cs,((1,0),(1,0)))
    H2,W2=img.shape
    for_=None
    # simple separable mean using uniform filter substitute
    return img
# gradient (orientation of hatch lines) on slightly smoothed image
gy,gx=np.gradient(a)
# tangent angle along edges = perpendicular to gradient
ang=(np.arctan2(gy,gx)+np.pi/2)*180/np.pi

CELL=9.0
TH=0.36                      # min mean darkness to place a glyph
pts=[]
ys=np.arange(CELL/2,H,CELL)
xs=np.arange(CELL/2,W,CELL)
c=int(CELL)
for cy in ys:
    iy=int(cy)
    for cx in xs:
        ix=int(cx)
        y0,y1=max(0,iy-c//2),min(H,iy+c//2+1)
        x0,x1=max(0,ix-c//2),min(W,ix+c//2+1)
        d=float(dark[y0:y1,x0:x1].mean())
        if d<TH: continue
        # jitter a touch for organic feel
        jx=(np.random.rand()-0.5)*CELL*0.5
        jy=(np.random.rand()-0.5)*CELL*0.5
        an=float(ang[iy,ix])
        if an>90: an-=180
        if an<-90: an+=180
        pts.append([round((cx+jx)/W,4), round((cy+jy)/H,4), round(min(1,d*1.15),2), round(an,1)])

print('points:',len(pts))

# preview render
prev=Image.new('RGB',(W,H),'white'); dr=ImageDraw.Draw(prev)
for x,y,d,an in pts:
    r=1+d*2.4
    dr.ellipse([x*W-r,y*H-r,x*W+r,y*H+r],fill=(20,20,15))
prev.save('/tmp/claude-0/-home-user-steadfast-scroller/f204a100-0eab-5dbe-b3fe-d22023b261d0/scratchpad/eyepts_preview.png')

json.dump(pts,open('/home/user/steadfast-scroller/ref/eyepts.json','w'),separators=(',',':'))
import os; print('json KB:',os.path.getsize('/home/user/steadfast-scroller/ref/eyepts.json')//1024)
