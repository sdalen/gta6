# GTA VI Gjennomgang

Uoffisiell norsk gjennomgang av historien i GTA VI: alle hovedoppdrag kapittel for kapittel, tips, valgfrie oppdrag og pengestrategi. Fremdriften lagres i nettleseren.

**Live:** https://sdalen.github.io/gta6/

## Utvikling

```bash
npm install
npm run dev
```

Bygget med React, TypeScript, Vite og Tailwind CSS. Hver push til `main` deployes automatisk til GitHub Pages.

## Kart og kilder

- Kartfliser og landemerkedata: **GTA VI Map Tiles** og **GTA VI Landmarks Data** fra [GTADB.ORG](https://map.gtadb.org) og bidragsytere, lisensiert under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Flisene er beskåret til nivå 0–5, og posisjonene til samleobjektene er utledet fra landemerkenavn (omtrentlige).
- Regenerer kartdata med `node scripts/build-map-crops.mts <sti til klone av github.com/rolux/gtadb.org>`.
- Innhold om oppdrag og samleobjekter er oversatt og tilpasset fra engelske fanguider (IGN, PowerPyx, The Big Lead, meowdb, Leonida Verse m.fl.).
