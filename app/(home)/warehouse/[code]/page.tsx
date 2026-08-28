export default async function WarehouseCodePage(
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;
    return (
        <div className=""> CODE : {code} </div>
    )

};
