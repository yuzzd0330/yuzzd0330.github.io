from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import quote
import hashlib
from concurrent.futures import ThreadPoolExecutor

BASE = "https://jingwei-project-library.fondpeony257.chatgpt.site/"
FILES = {
  "style.css": "0d7e04ce36145dffee66233e381adbfe7f9304d3a9320a1891e590be1923ab33",
  "app.js": "061713f288df05b7a1f8a62751fc41b3e4def107e8e22c5a3ab9f61c5f34b975",
  "index.html": "898319291e86cc0d6e2d449dc71ac2dbda155414d3fe416b6e8b5c70152094c7",
  "favicon.svg": "5911c501ae6c34f3566725192927096c4dac352ab81ccd9a7557e726b050c315",
  "profile.js": "21498957c98b7c4e0e5360d4bd9bc22ed12cd096bc89c9a62df55fdbe83f276e",
  "data.js": "2ab66469db7071bc96ff24a734b0df167d5455c802db116657fa3a08af515e78",
  "assets/xinyan-1.pptx": "8c0c42eb084182fbf97a83580e94e5484c4dc740e75c1b6880d0a692a2abb5b9",
  "assets/sinopec-1.pdf": "c7bc697030dc40757b305fffcc33dceceb510eddbd9b0a63eef25471e56cba6a",
  "assets/kangdexin.png": "f4838edef36d79cb8c8903253756c9eb87280d379ada7a040b95733cd846830f",
  "assets/bibliometric.png": "482cb877752b18e258e698311f3172a5da1230e2064734c6293e6409123f37b4",
  "assets/hollywood-1.part3": "e0fa6e11f0d948e0840ec1c053c0552e28c28b124cc1ac11b466b12e30e3b365",
  "assets/auto-esg-1.pdf": "964302b0ac5f500afca1a90b964d7784043f9d51410b3a13250ca55b6738c524",
  "assets/capital-capacity.png": "be5d23beebab793ac5852c1d55e924c50e4d5d6a7b5e480471f556d863abb4aa",
  "assets/hollywood-1.part1": "549e877216d22d1f65df10acaebc1724eb9be8faad232ac0b257cc8a64f21c9a",
  "assets/hilton-lotus-1.pdf": "78a26dfc7b59cf11c89e35576b7484733aea2618d549d0348b1b51e2686bfa5f",
  "assets/sinopec-2.xlsx": "443efb7a0b296b8640fdf0b7e8bb21699cac232c2b3c0002c7476c7d9bab1d7c",
  "assets/tourism-consulting.png": "6da27f7ac0c15e8a71988fa70fe99bf61cde5ee2e688b90a27466bfa2e6a7358",
  "assets/python-finance-1.ipynb": "4d378c98dfb60b73f2b263b06d1b653fcc06d07449ff3f89da971c18791ff1a1",
  "assets/surf-1.jpg": "8d4b3864a514fd7e1ca710d0dffe3312892ab07344299863db0fe20bb3b7e11b",
  "assets/hollywood-2.docx": "cc313c6d8cbf474d59b1da7c42450ece85b01f833789f4458b0bfa4c7913ca94",
  "assets/hollywood-1.pdf": "e0d5d52928f9a0091437041d772c872cde44807b7bb26840f0d3573e649e1650",
  "assets/auto-esg.png": "d35e7cf0aee72c5f59c944cc39e761d1d6756830ee1604005ca61f1182ecefd3",
  "assets/greentech.png": "9afaffabca5bc126d87e72f5ff52364d3e63ecea836af98753e70f9dcd6b8eed",
  "assets/tourism-consulting-2.pdf": "202546173f7b15cb5f3f457c5dde3e557b0f4522efcef37ab896ff15dc0305f3",
  "assets/hollywood-1.part2": "0a5eafc8a8c7c52f4cc61a4ff67043badb89b731816e5ba48e82db60b36f1807",
  "assets/surf-4.xlsx": "1640862ba81b64706abc5d974792d4c29c5d97dac1e2b22ca596e0ad882bc801",
  "assets/kangdexin-1.docx": "3d525c3aa4497eead55488a648b4372fd8d54a9bd7fc9645b1ea8d500df05059",
  "assets/capital-capacity-1.pdf": "0f9b30c91797f1f1cc47cc64ddf1d1fbeee98a23af08fc77b84dd35254e549ab",
  "assets/huazhu-1.pdf": "cf2d52d179b1d00bdbf28589be120083a426ec3352332df7be4aa94b760cfc01",
  "assets/botanical-vine.svg": "fe188591508aa430558c981e22ac08fdb2b6de01169c60aa0fb2228ed22d39ae",
  "assets/bibliometric-1.docx": "41709dba27aa08e6efd04228546b2583d1717b04ce9567efdffc2a54eee4e4b5",
  "assets/python-finance-1.html": "5d15c9dcdca9a6eaf05bd0fc78352bed26148fc375292228d58245d204ec921b",
  "assets/sinopec-1.docx": "c5e854c234952352fe0d5cd4bb330a38abe1227a3f3580ce39b9ac353ee298c7",
  "assets/botanical-scroll.svg": "80f25e0efc7de114ce770732fcf35483771f2ec0d5d1b1ac38451ebdae8a3fd0",
  "assets/digital-audit.png": "69cc4320c60f9f3ede026cd4a1a3814b741caacfec292a55c8292855a4faa5df",
  "assets/huazhu-1.docx": "7f89671f8f0d68594260e48103e82e57d9dc6f26cb4c07176dbe27db8cc82cf3",
  "assets/hilton-lotus.png": "da99fff14893b9cdcf962fa71435e13f0fbe1f61a9b40fd59ef5880dec3f6674",
  "assets/portrait-original.jpg": "f2fbf2ef13b527261e1fbe9adcc3e1a95988d7164d10c6e98d7ac3bc29428c6e",
  "assets/hollywood-2.pdf": "3b80b5f44b3562b65bc8a427d838f9068c7cae3c1ca48e3d7df8824ca2ab0704",
  "assets/liverpool-logo.svg": "d90ab0b649e967cd66bff7380e0181a912086597804427d621e0dfca8d3e4fe0",
  "assets/sinopec.png": "357a797d58533dd6d74c30ae590b49d3df42a070853b31ba5f5f7a7ec4c5db60",
  "assets/hollywood-1.part0": "9eda4ec7af2112fe5a0c4caaa111a3ed85d14157f4c86eb911c4f0c685fe8aaf",
  "assets/digital-audit-1.docx": "1fdc40a5bef7a87ddfbd011626563a50d509d91fb894a3615512fc146803f530",
  "assets/kangdexin-1.pdf": "edc6d21b6e2d017fb43385259117102a2b54d72064b7afc0179c713373f3a153",
  "assets/greentech-1.docx": "92cac4c6465e0e1bb7ca8f4ab1dc779112e01311cac40c00833535c3e81e094b",
  "assets/surf-2.xlsx": "6cf21f84937b8132c50dca23a789334108df2001a45d3dda2ece28debb7589c2",
  "assets/bibliometric-2.csv": "fd6818163b9dc6a6596d8ae4fd4769daade8203d16712655e55ce3edea71355b",
  "assets/tourism-consulting-1.pdf": "5dd125d25a5a47414bb367ae3fd5fe7d704016943c8b9af3494b3ea7e980584f",
  "assets/huazhu.png": "492127300ac14a53632c994f1d3926fd072b1addffc71bd881bfa4514af69bff",
  "assets/xinyan-1.pdf": "ebe98716202571e1e6cb660beae0ca16305892665556423580f3fbec07d11e83",
  "assets/surf-5.pdf": "dfa1ebdc86eb70f4597b7f0bb19357a5edca755164bb9f75c6013f8e43b0e127",
  "assets/greentech-1.pdf": "5ff434e3b428312e9be29d9bbab774ba8b55dc2db97b84b8149bb9bac86d6342",
  "assets/xjtlu-logo.svg": "9389b328b3b2ef4f5ab35b5f45563fa195fc57a06867b544654f487212e685b3",
  "assets/hollywood.png": "241bfa1d96facec84d045393b7c21d974dfe6675a70922e4dba655acaf805f8e",
  "assets/surf-3.pdf": "d416d20a13eb6bafb2b26364df42d589c985582f9a6f690575c4eccd2a1aadb0",
  "assets/bibliometric-1.pdf": "32623ea35805c6b1c674e9005d5144ae0e0673f49243b61a11e466cb955dda2c",
  "assets/nus-logo.png": "1571e43101f31253f01a019be18594779886d6931869eb89320b4a663d010979",
  "assets/digital-audit-1.pdf": "94e1c5795c2895bf494b4bc6ee26dc44e12c617ad086b1e88af0f285c385d3be",
  "assets/surf-6.xlsx": "f2a03a47d645af15f8a333c32db0ff95312577276ed343e7e74a28b2c995207f",
  "assets/auto-esg-1.docx": "1a37347d2f7ad74f2e13afd51f3bd407e1b12d5345f4fd49cfab48ec8136689f",
  "assets/python-finance.png": "6294e0749088604703d48bfceec6e06434aa6d01ca107c925b2e5ec489a3a554",
  "assets/xinyan.png": "54aba2a36a352c576d99a4f0331371b2c102a0e5087a93c0a282f35789c35a51",
  "assets/xjtlu-identity-original.png": "e3ad18740ba817c8c0a6512807a2b5a661fe8d9161778165ecf13d008a2a249f"
}
ROOT = Path("site")
ROOT.mkdir(exist_ok=True)
def download(item):
    name, expected = item
    request = Request(BASE + quote(name), headers={"User-Agent": "Portfolio-Migration/1.0"})
    with urlopen(request, timeout=120) as response:
        data = response.read()
    if hashlib.sha256(data).hexdigest() != expected:
        raise RuntimeError("Source file changed or unavailable: " + name)
    target = ROOT / name
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
with ThreadPoolExecutor(max_workers=4) as pool:
    list(pool.map(download, FILES.items()))
index = ROOT / "index.html"
index.write_text(index.read_text().replace("私人工作版本", "个人项目档案"))
(ROOT / ".nojekyll").touch()
print("Imported and verified", len(FILES), "website files.")
