import config from "@/data/config.json"

export const instagram = async (args: string[]): Promise<string> => {
  window.open(`https://www.instagram.com/${config.social.instagram}/`)

  return "Opening instagram..."
}

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`)

  return "Opening github..."
}

export const facebook = async (args: string[]): Promise<string> => {
  window.open(`https://www.facebook.com/${config.social.facebook}/`)

  return "Opening facebook..."
}
