export async function getUserNameFromLocalStorage(page): Promise<string | null> {
    return await page.evaluate(() => {
        const userDataRaw = localStorage.getItem('UserData');
        if (!userDataRaw) return null;
        try {
            const userData = JSON.parse(userDataRaw);
            return userData.name || null;
        } catch {
            return null;
        }
    });
}