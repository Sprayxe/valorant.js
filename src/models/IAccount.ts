export interface IAccount {
    /**
     * - ID of your account
     * @warning This is not your riot id
     */
    Subject: string
    /**
     * - Gamename of your account
     */
    GameName: string
    /**
     * - Tag of your account
     */
    TagLine: string
    /**
     * - Displayname of your account
     * @warning DisplayName can be empty
     */
    DisplayName?: string
}