# MutedToMuzzled (Revenge)

Replaces Discord Android's muted mic icon with the dog muzzle from
https://github.com/zoez22/muzzlemute

This is a plugin, not a theme. Revenge themes cannot swap icons.

## Tooltip text ("Muzzled")

The Vencord CSS also rewrites the Unmute tooltip. Android tooltips come from
native strings / accessibility labels, not CSS. This plugin only swaps the
image. Changing the label needs a separate i18n / Pressable patch and breaks
easily across Discord versions.

## Credits

- Original BetterDiscord idea: 1xzozz
- Vencord CSS port: moshikiwi
- Muzzle PNG: zoez22/muzzlemute
