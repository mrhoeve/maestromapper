<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:icbm="http://postneo.com/icbm/">
    <xsl:template match="/fuzzyg">
        <h2>Results for
            <xsl:value-of select="request/query"/>
        </h2>
        <table>
            <tr>
            </tr>
            <xsl:for-each select="response/results/result">
                <xsl:sort select="@accuracy" order="descending"/>
                <xsl:sort select="dsg/@code" order="descending"/>
                <xsl:if test="(dsg/@code = 'PPL' or dsg/@code = 'PPLC' or dsg/@code = 'PPLA') and @accuracy > 0.95">
                    <tr>
                        <td valign="top">

                            <input style="width:30" type="button" name="selectPlace" value="Go!"
                                   onclick="handleXSLClick('{fullname}', {ddlat}, {ddlong})"/> <br />
                            <input style="width: 30" type="button" name="searchRound" value="RS!"
                                   onclick="performRadiusSearch({ddlat}, {ddlong})"/>
                        </td>
                        <td>
                            <b>
                                <xsl:value-of select="fullname"/>
                            </b>
                            ,
                            <xsl:if test="adm != ''">
                                <i>
                                    <xsl:value-of select="adm"/>
                                </i>
                                ,
                            </xsl:if>
                            <xsl:value-of select="cc"/>
                            <xsl:choose>
                                <xsl:when test="@accuracy > 0.95">
                                    <img alt="95" src="./images/5star.gif"/>
                                </xsl:when>
                                <xsl:when test="@accuracy > 0.85">
                                    <img alt="80" src="./images/4star.gif"/>
                                </xsl:when>
                                <xsl:when test="@accuracy > 0.6">
                                    <img alt="60" src="./images/3star.gif"/>
                                </xsl:when>
                                <xsl:when test="@accuracy > 0.4">
                                    <img alt="40" src="./images/2star.gif"/>
                                </xsl:when>
                                <xsl:when test="@accuracy > 0.2">
                                    <img alt="20" src="./images/1star.gif"/>
                                </xsl:when>
                            </xsl:choose>
                            <br/>
                            <xsl:choose>
                                <xsl:when test="dsg/@code = 'PPLC' or dsg/@code = 'PPLA'">
                                    <b>
                                        <xsl:value-of select="dsg"/>
                                    </b>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="dsg"/>
                                </xsl:otherwise>
                            </xsl:choose>
                            <font color="gray">
                                <br/>(lat/lon):
                                <xsl:value-of select="ddlat"/>,<xsl:value-of select="ddlong"/>
                            </font>
                        </td>
                    </tr>
                </xsl:if>
            </xsl:for-each>

            <!-- all the other features -->
            <xsl:for-each select="response/results/result">
                <xsl:sort select="@accuracy" order="descending"/>
                <xsl:sort select="dsg/@code" order="descending"/>
                <xsl:if test="(dsg/@code != 'PPL' and dsg/@code != 'PPLC' and dsg/@code != 'PPLA') or accuracy &lt; 0.95">
                    <tr>
                        <td valign="top">

                            <input style="width:30" type="button" name="selectPlace" value="Go!"
                                   onclick="handleXSLClick('{fullname}', {ddlat}, {ddlong})"/> <br />
                            <input style="width: 30" type="button" name="searchRound" value="RS!"
                                   onclick="performRadiusSearch({ddlat}, {ddlong})"/>
                        </td>
                        <td>
                            <b>
                                <xsl:value-of select="fullname"/>
                            </b>
                            ,
                            <xsl:if test="adm != ''">
                                <i>
                                    <xsl:value-of select="adm"/>
                                </i>
                                ,
                            </xsl:if>
                            <xsl:value-of select="cc"/>
                            <xsl:choose>
                                <xsl:when test="@accuracy > 0.95">
                                    <img title="{format-number(@accuracy * 100,'##')}%" alt="95"
                                         src="./images/5star.gif"/>
                                </xsl:when>
                                <xsl:when test="@accuracy > 0.8">
                                    <img title="{format-number(@accuracy * 100,'##')}%" alt="85"
                                         src="./images/4star.gif"/>
                                </xsl:when>
                                <xsl:when test="@accuracy > 0.6">
                                    <img title="{format-number(@accuracy * 100,'##')}%" alt="60"
                                         src="./images/3star.gif"/>
                                </xsl:when>
                                <xsl:when test="@accuracy > 0.4">
                                    <img title="{format-number(@accuracy * 100,'##')}%" alt="40"
                                         src="./images/2star.gif"/>
                                </xsl:when>
                                <xsl:when test="@accuracy > 0.2">
                                    <img title="{format-number(@accuracy * 100,'##')}%" alt="20"
                                         src="./images/1star.gif"/>
                                </xsl:when>
                            </xsl:choose>
                            <br/>
                            <xsl:choose>
                                <xsl:when test="dsg/@code = 'PPLC'">
                                    <b>
                                        <xsl:value-of select="dsg"/>
                                    </b>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="dsg"/>
                                </xsl:otherwise>
                            </xsl:choose>
                            --<xsl:value-of select="dsg/@code"/>
                            <font color="gray">
                                <br/>(lat/lon): <xsl:value-of select="ddlat"/>,<xsl:value-of select="ddlong"/>
                            </font>
                        </td>
                    </tr>
                </xsl:if>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>
