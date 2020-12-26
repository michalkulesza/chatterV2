import { EmojiData, Picker } from "emoji-mart";

declare module "emoji-mart" {
	export type EmojiData = BaseEmoji;
}
