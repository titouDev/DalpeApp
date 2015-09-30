# -*- coding: utf-8 -*-
from Models import baseAlchemy

attributes = [
    "specialites",
    "name",
    "contactName",
    "phone",
    "cell",
    "fax",
    "address",
    "city",
    "province",
    "postalCode",
    "email",
    "webSite",
    "rbqLicense",
    "note"
]
sousTraitants = []
with open('../Documents_Dalpe/liste.csv', 'r') as f:
    for line in f.readlines():
        st = {"tpsNumber": u"", "isActive": True}
        splitLine = line.split(";")
        for i in range(0, len(splitLine)):
            att = attributes[i]
            if att == "specialites":
                st[att] = [unicode(splitLine[i], "utf8")]
            else:
                st[att] = unicode(splitLine[i], "utf8")
        sousTraitants.append(st)
#  import pprint
print sousTraitants
exit()
for s in sousTraitants:
    try:
        baseAlchemy.create("Soustraitant", **s)
    except:
        pass